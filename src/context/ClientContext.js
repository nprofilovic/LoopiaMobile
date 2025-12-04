// src/context/ClientContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { LoopiaAPI } from '../api/endpoints';
import { safeApiCall, logError } from '../api/errorHandler';

const ClientContext = createContext(null);

export const ClientProvider = ({ children }) => {
  const { client } = useAuth();
  
  // State
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  // Cache duration - 5 minuta
  const CACHE_DURATION = 5 * 60 * 1000;

  /**
   * Učitava sve klijente
   */
  const fetchClients = async (forceRefresh = false) => {
    // Ako imamo fresh cache i nije force refresh, vrati cached podatke
    if (!forceRefresh && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
      return { success: true, data: clients };
    }

    if (!client) {
      return { success: false, error: 'Not authenticated' };
    }

    setLoading(true);
    setError(null);

    try {
      const { success, data, error } = await safeApiCall(
        () => LoopiaAPI.getCustomers(client),
        { retry: true }
      );

      if (success) {
        // Transformiši podatke ako je potrebno
        const transformedClients = Array.isArray(data) ? data : [];
        setClients(transformedClients);
        setLastFetch(Date.now());
        return { success: true, data: transformedClients };
      } else {
        setError(error);
        logError('fetchClients', error);
        return { success: false, error };
      }
    } catch (err) {
      setError(err);
      logError('fetchClients', err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Pronalazi klijenta po ID-u
   */
  const getClientById = (clientId) => {
    return clients.find(c => c.id === clientId);
  };

  /**
   * Filtrira klijente po statusu
   */
  const getClientsByStatus = (status) => {
    return clients.filter(c => c.status === status);
  };

  /**
   * Pretraga klijenata
   */
  const searchClients = (query) => {
    if (!query || !query.trim()) {
      return clients;
    }

    const lowerQuery = query.toLowerCase();
    return clients.filter(
      c =>
        c.name?.toLowerCase().includes(lowerQuery) ||
        c.company?.toLowerCase().includes(lowerQuery) ||
        c.domain?.toLowerCase().includes(lowerQuery)
    );
  };

  /**
   * Osvežava podatke o jednom klijentu
   */
  const refreshClient = async (clientId) => {
    if (!client) return { success: false };

    try {
      // Ovde bi trebao API poziv za pojedinačnog klijenta
      // Za sada samo refresh-ujemo sve
      return await fetchClients(true);
    } catch (err) {
      logError('refreshClient', err);
      return { success: false, error: err };
    }
  };

  /**
   * Briše cache i učitava sve iznova
   */
  const invalidateCache = () => {
    setLastFetch(null);
    return fetchClients(true);
  };

  /**
   * Vraća statistiku o klijentima
   */
  const getClientStats = () => {
    return {
      total: clients.length,
      active: clients.filter(c => c.status === 'active').length,
      inactive: clients.filter(c => c.status === 'inactive').length,
      warning: clients.filter(c => c.status === 'warning').length,
      totalServices: clients.reduce((sum, c) => sum + (c.services || 0), 0),
    };
  };

  // Auto-fetch kada se client promeni (nakon login-a)
  useEffect(() => {
    if (client && clients.length === 0) {
      fetchClients();
    }
  }, [client]);

  const value = {
    // State
    clients,
    loading,
    error,
    lastFetch,

    // Actions
    fetchClients,
    refreshClient,
    invalidateCache,

    // Getters
    getClientById,
    getClientsByStatus,
    searchClients,
    getClientStats,
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

/**
 * Hook za pristup ClientContext-u
 */
export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients must be used within ClientProvider');
  }
  return context;
};

export default ClientContext;