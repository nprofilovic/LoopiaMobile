// API metodi za Loopia
export const LoopiaAPI = {
    // Klijenti
    getCustomers: async (client, customerNumber = null) => {
      const params = customerNumber ? [customerNumber] : [];
      return await client.call('getCustomers', params);
    },
  
    // Domeni
    getDomains: async (client, customerNumber) => {
      return await client.call('getDomains', [customerNumber]);
    },
  
    getDomainInfo: async (client, customerNumber, domain) => {
      return await client.call('getDomainInfo', [customerNumber, domain]);
    },
  
    // Email nalozi
    getEmailAccounts: async (client, customerNumber, domain) => {
      return await client.call('getEmailAccounts', [customerNumber, domain]);
    },
  
    addEmailAccount: async (client, customerNumber, domain, email, password, quota = 1000) => {
      return await client.call('addEmailAccount', [
        customerNumber,
        domain,
        email,
        password,
        quota,
      ]);
    },
  
    removeEmailAccount: async (client, customerNumber, domain, email) => {
      return await client.call('removeEmailAccount', [customerNumber, domain, email]);
    },
  
    // MySQL baze
    getDatabases: async (client, customerNumber, domain) => {
      return await client.call('getDatabases', [customerNumber, domain]);
    },
  
    addDatabase: async (client, customerNumber, domain, database, password) => {
      return await client.call('addDatabase', [
        customerNumber,
        domain,
        database,
        password,
      ]);
    },
  
    // FTP pristup
    getFTPAccess: async (client, customerNumber, domain) => {
      return await client.call('getFTPAccess', [customerNumber, domain]);
    },
  
    // Računi (invoices)
    getInvoices: async (client, customerNumber) => {
      return await client.call('getInvoices', [customerNumber]);
    },
  
    getUnpaidInvoices: async (client) => {
      return await client.call('getUnpaidInvoices');
    },
  };