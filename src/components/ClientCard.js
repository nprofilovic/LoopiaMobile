// src/components/ClientCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const ClientCard = ({ 
  client,
  onPress,
  style 
}) => {
  const { name, company, domain, services, status = 'active' } = client;

  // Boja status indikatora
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return '#10B981'; // Zelena
      case 'warning':
        return '#F59E0B'; // Narandžasta
      case 'inactive':
        return '#EF4444'; // Crvena
      default:
        return '#10B981';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Header sa imenom i statusom */}
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
            <View 
              style={[
                styles.statusDot, 
                { backgroundColor: getStatusColor() }
              ]} 
            />
          </View>
          
          <ChevronRight 
            width={20} 
            height={20} 
            color="#64748B" 
          />
        </View>

        {/* Company */}
        <Text style={styles.company}>{company}</Text>

        {/* Domen */}
        <Text style={styles.domain}>{domain}</Text>
      </View>

      {/* Footer sa brojem servisa */}
      <View style={styles.footer}>
        <Text style={styles.servicesText}>
          {services} {services === 1 ? 'servis' : services < 5 ? 'servisa' : 'servisa'}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.detailsButton}>Vidi detalje</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    overflow: 'hidden',
    // Shadow za iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation za Android
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  company: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
  domain: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  servicesText: {
    fontSize: 12,
    color: '#64748B',
  },
  detailsButton: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E31E24',
  },
});

export default ClientCard;