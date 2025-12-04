// src/api/errorHandler.js
import { ERROR_CODES } from '../utils/constants';

/**
 * Loopia API Error Handler
 * Pretvara Loopia error kodove u user-friendly poruke
 */

class LoopiaError extends Error {
  constructor(code, message, originalError = null) {
    super(message);
    this.name = 'LoopiaError';
    this.code = code;
    this.originalError = originalError;
  }
}

/**
 * Obrađuje greške iz Loopia API poziva
 * @param {Object} error - Error objekat
 * @returns {LoopiaError} - Formatirani error objekat
 */
export const handleLoopiaError = (error) => {
  // Ako je već LoopiaError, samo ga vrati
  if (error instanceof LoopiaError) {
    return error;
  }

  // Loopia API greška sa kodom
  if (error.code && typeof error.code === 'number') {
    const message = ERROR_CODES[error.code] || error.message || 'Nepoznata greška';
    return new LoopiaError(error.code, message, error);
  }

  // Network greška
  if (error.code === 'NETWORK_ERROR') {
    return new LoopiaError(
      'NETWORK_ERROR',
      'Greška u komunikaciji sa serverom. Proverite internet konekciju.',
      error
    );
  }

  // HTTP greška
  if (error.code === 'HTTP_ERROR') {
    return new LoopiaError(
      'HTTP_ERROR',
      error.message || 'HTTP greška pri komunikaciji sa serverom',
      error
    );
  }

  // Parse greška
  if (error.code === 'PARSE_ERROR') {
    return new LoopiaError(
      'PARSE_ERROR',
      'Greška u parsiranju odgovora sa servera',
      error
    );
  }

  // Nepoznata greška
  return new LoopiaError(
    'UNKNOWN_ERROR',
    error.message || 'Došlo je do nepoznate greške',
    error
  );
};

/**
 * Proverava da li je greška vezana za autentifikaciju
 * @param {Object} error - Error objekat
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error.code === 401 || error.code === 40401;
};

/**
 * Proverava da li je greška vezana za rate limiting
 * @param {Object} error - Error objekat
 * @returns {boolean}
 */
export const isRateLimitError = (error) => {
  return error.code === 429;
};

/**
 * Proverava da li je greška vezana za nedostatak sredstava
 * @param {Object} error - Error objekat
 * @returns {boolean}
 */
export const isInsufficientFundsError = (error) => {
  return error.code === 60001;
};

/**
 * Formatira error za prikaz u Alert-u
 * @param {Object} error - Error objekat
 * @returns {Object} - {title, message}
 */
export const formatErrorForAlert = (error) => {
  const loopiaError = handleLoopiaError(error);

  // Specifični title-ovi za različite tipove grešaka
  let title = 'Greška';

  if (isAuthError(loopiaError)) {
    title = 'Greška u prijavljivanju';
  } else if (isRateLimitError(loopiaError)) {
    title = 'Previše zahteva';
  } else if (isInsufficientFundsError(loopiaError)) {
    title = 'Nedovoljno sredstava';
  } else if (loopiaError.code === 'NETWORK_ERROR') {
    title = 'Greška u konekciji';
  }

  return {
    title,
    message: loopiaError.message,
  };
};

/**
 * Log-uje greške u razvoju
 * @param {string} context - Kontekst greške (npr. 'Login', 'GetClients')
 * @param {Object} error - Error objekat
 */
export const logError = (context, error) => {
  if (__DEV__) {
    console.group(`[Loopia Error] ${context}`);
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    if (error.originalError) {
      console.error('Original Error:', error.originalError);
    }
    console.groupEnd();
  }
};

/**
 * Retry logika za API pozive
 * @param {Function} apiCall - Funkcija koja poziva API
 * @param {number} maxRetries - Maksimalan broj pokušaja (default: 3)
 * @param {number} delay - Delay između pokušaja u ms (default: 1000)
 * @returns {Promise}
 */
export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      // Ne retry-uj autentifikacijske greške
      if (isAuthError(error)) {
        throw handleLoopiaError(error);
      }

      // Ne retry-uj rate limit greške odmah
      if (isRateLimitError(error)) {
        throw handleLoopiaError(error);
      }

      // Ako je poslednji pokušaj, baci grešku
      if (i === maxRetries - 1) {
        throw handleLoopiaError(error);
      }

      // Čekaj pre sledećeg pokušaja
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }

  throw handleLoopiaError(lastError);
};

/**
 * Validira API response
 * @param {Object} response - API response
 * @returns {boolean}
 */
export const isValidResponse = (response) => {
  return response !== null && response !== undefined;
};

/**
 * Safe API call wrapper sa error handlingom
 * @param {Function} apiCall - API funkcija
 * @param {Object} options - Opcije {showError: boolean, retry: boolean}
 * @returns {Promise<{success: boolean, data: any, error: any}>}
 */
export const safeApiCall = async (apiCall, options = {}) => {
  const { showError = true, retry = false } = options;

  try {
    const callFunction = retry ? () => retryApiCall(apiCall) : apiCall;
    const data = await callFunction();

    if (!isValidResponse(data)) {
      throw new Error('Invalid response from API');
    }

    return {
      success: true,
      data,
      error: null,
    };
  } catch (error) {
    const loopiaError = handleLoopiaError(error);
    
    if (showError && __DEV__) {
      logError('API Call', loopiaError);
    }

    return {
      success: false,
      data: null,
      error: loopiaError,
    };
  }
};

export default {
  handleLoopiaError,
  isAuthError,
  isRateLimitError,
  isInsufficientFundsError,
  formatErrorForAlert,
  logError,
  retryApiCall,
  safeApiCall,
  isValidResponse,
  LoopiaError,
};