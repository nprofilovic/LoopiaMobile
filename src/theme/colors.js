// src/theme/colors.js

// Loopia Brand Colors
export const BRAND = {
  primary: '#E31E24',      // Loopia Crvena
  primaryDark: '#C11117',  // Tamnija Crvena
  secondary: '#E91E8C',    // Loopia Roze/Magenta
};

// Status Colors
export const STATUS = {
  success: '#10B981',      // Zelena - Uspešno
  warning: '#F59E0B',      // Narandžasta - Upozorenje
  error: '#EF4444',        // Crvena - Greška
  info: '#3B82F6',         // Plava - Informacija
};

// Background Colors
export const BACKGROUND = {
  primary: '#F8FAFC',      // Glavni background
  secondary: '#F1F5F9',    // Sekundarni background
  card: '#FFFFFF',         // Kartice
  input: '#F8FAFC',        // Input polja
};

// Text Colors
export const TEXT = {
  primary: '#1E293B',      // Glavni tekst
  secondary: '#475569',    // Sekundarni tekst
  light: '#64748B',        // Svetliji tekst
  disabled: '#94A3B8',     // Disabled tekst
  white: '#FFFFFF',        // Beli tekst
};

// Border Colors
export const BORDER = {
  light: '#F1F5F9',        // Svetla border
  default: '#E2E8F0',      // Default border
  dark: '#CBD5E1',         // Tamnija border
};

// Gradient Colors - za LinearGradient komponente
export const GRADIENTS = {
  primary: ['#E31E24', '#C11117'],              // Crveni gradient
  primaryExtended: ['#E31E24', '#C11117', '#E91E8C'], // Crveni sa rozom
  secondary: ['#E91E8C', '#D946EF'],            // Roze gradient
  success: ['#10B981', '#059669'],              // Zeleni gradient
  warning: ['#F59E0B', '#D97706'],              // Narandžasti gradient
  info: ['#3B82F6', '#2563EB'],                 // Plavi gradient
  purple: ['#8B5CF6', '#7C3AED'],               // Ljubičasti gradient
};

// Service Colors - za različite servise
export const SERVICES = {
  ftp: {
    icon: '#E31E24',
    background: '#FEE2E2',
  },
  email: {
    icon: '#10B981',
    background: '#D1FAE5',
  },
  database: {
    icon: '#8B5CF6',
    background: '#EDE9FE',
  },
  hosting: {
    icon: '#F59E0B',
    background: '#FEF3C7',
  },
  server: {
    icon: '#3B82F6',
    background: '#DBEAFE',
  },
};

// Shadow Colors
export const SHADOW = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  colored: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  }),
};

// Invoice/Status Badge Colors
export const INVOICE_STATUS = {
  pending: {
    background: '#DBEAFE',
    text: '#1E40AF',
    label: 'Aktivan',
  },
  overdue: {
    background: '#FEF3C7',
    text: '#92400E',
    label: 'Dospeo',
    borderColor: '#FDE68A',
  },
  paid: {
    background: '#D1FAE5',
    text: '#065F46',
    label: 'Plaćen',
  },
};

// Client Status Colors
export const CLIENT_STATUS = {
  active: '#10B981',       // Zelena tačka
  warning: '#F59E0B',      // Narandžasta tačka
  inactive: '#EF4444',     // Crvena tačka
};

// Activity Colors - za Dashboard aktivnosti
export const ACTIVITY = {
  red: {
    background: '#FEE2E2',
    dot: '#E31E24',
  },
  green: {
    background: '#D1FAE5',
    dot: '#10B981',
  },
  purple: {
    background: '#EDE9FE',
    dot: '#8B5CF6',
  },
  blue: {
    background: '#DBEAFE',
    dot: '#3B82F6',
  },
  orange: {
    background: '#FEF3C7',
    dot: '#F59E0B',
  },
};

// Info Card Colors
export const INFO_CARD = {
  info: {
    background: '#EFF6FF',
    border: '#DBEAFE',
    text: '#1E40AF',
  },
  warning: {
    background: '#FEF3C7',
    border: '#FDE68A',
    text: '#92400E',
  },
  success: {
    background: '#D1FAE5',
    border: '#A7F3D0',
    text: '#065F46',
  },
  error: {
    background: '#FEE2E2',
    border: '#FECACA',
    text: '#991B1B',
  },
};

// Export default object sa svim bojama
export default {
  brand: BRAND,
  status: STATUS,
  background: BACKGROUND,
  text: TEXT,
  border: BORDER,
  gradients: GRADIENTS,
  services: SERVICES,
  shadow: SHADOW,
  invoiceStatus: INVOICE_STATUS,
  clientStatus: CLIENT_STATUS,
  activity: ACTIVITY,
  infoCard: INFO_CARD,
};

// Helper funkcije
export const getServiceColor = (serviceType) => {
  return SERVICES[serviceType] || SERVICES.server;
};

export const getStatusColor = (status) => {
  return CLIENT_STATUS[status] || CLIENT_STATUS.active;
};

export const getInvoiceStatusColor = (status) => {
  return INVOICE_STATUS[status] || INVOICE_STATUS.pending;
};

export const getActivityColor = (color) => {
  return ACTIVITY[color] || ACTIVITY.blue;
};