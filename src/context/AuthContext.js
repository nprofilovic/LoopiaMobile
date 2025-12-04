import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoopiaClient from '../api/loopiaClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredCredentials();
  }, []);

  const loadStoredCredentials = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setClient(new LoopiaClient(userData.username, userData.password));
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const loopiaClient = new LoopiaClient(username, password);
      
      // Test kredencijala - pozovi neki jednostavan API metod
      await loopiaClient.call('getCustomers');
      
      const userData = { username, password };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setClient(loopiaClient);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Greška pri prijavljivanju',
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setClient(null);
  };

  return (
    
      {children}
    
  );
};
export const useAuth = () => useContext(AuthContext);