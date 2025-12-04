// src/screens/ClientPortalScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, Menu, HardDrive, Mail, Database, Server } from 'lucide-react-native';
import LoopiaLogo from '../components/LoopiaLogo';
import ServiceButton from '../components/ServiceButton';

const ClientPortalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Podaci o klijentu prosleđeni iz ClientListScreen
  const { clientName, clientData } = route.params || {};
  
  // Mock data za servise - kasnije ćemo dobiti iz API-ja
  const client = clientData || {
    name: 'Petar Petrović',
    company: 'Pet Shop "Rex"',
    domain: 'petshop-rex.rs',
    services: 3,
    status: 'active',
  };

  const services = {
    hosting: { active: true, plan: 'Business' },
    email: { active: true, count: 3 },
    database: { active: true, count: 2 },
    ftp: { active: true },
  };

  // Inicijali za avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <LoopiaLogo />
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Menu width={20} height={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft width={20} height={20} color="#E31E24" />
            <Text style={styles.backButtonText}>Nazad na listu</Text>
          </TouchableOpacity>
        </View>

        {/* Client Info */}
        <View style={styles.clientInfoContainer}>
          <View style={styles.clientHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(client.name)}</Text>
            </View>
            <View style={styles.clientDetails}>
              <Text style={styles.clientName}>{client.name}</Text>
              <Text style={styles.clientCompany}>{client.company}</Text>
            </View>
          </View>

          <View style={styles.domainCard}>
            <Text style={styles.domainLabel}>Domen:</Text>
            <Text style={styles.domainValue}>{client.domain}</Text>
          </View>
        </View>

        {/* Services Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pregled Servisa</Text>
          <View style={styles.servicesGrid}>
            <View style={styles.serviceCard}>
              <Server width={24} height={24} color="#E31E24" />
              <Text style={styles.serviceCardLabel}>Hosting</Text>
              <Text style={styles.serviceCardValue}>
                {services.hosting.active ? 'Aktivan' : 'Neaktivan'}
              </Text>
            </View>

            <View style={styles.serviceCard}>
              <Mail width={24} height={24} color="#10B981" />
              <Text style={styles.serviceCardLabel}>Email nalozi</Text>
              <Text style={styles.serviceCardValue}>
                {services.email.count} aktivna
              </Text>
            </View>

            <View style={styles.serviceCard}>
              <Database width={24} height={24} color="#8B5CF6" />
              <Text style={styles.serviceCardLabel}>SQL Baze</Text>
              <Text style={styles.serviceCardValue}>
                {services.database.count} baze
              </Text>
            </View>

            <View style={styles.serviceCard}>
              <HardDrive width={24} height={24} color="#F59E0B" />
              <Text style={styles.serviceCardLabel}>FTP Pristup</Text>
              <Text style={styles.serviceCardValue}>
                {services.ftp.active ? 'Aktivan' : 'Neaktivan'}
              </Text>
            </View>
          </View>
        </View>

        {/* Service Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upravljanje Servisima</Text>
          
          <ServiceButton
            icon={HardDrive}
            title="FTP Pristup"
            subtitle="Pregled kredencijala"
            iconColor="#E31E24"
            iconBgColor="#FEE2E2"
            onPress={() => navigation.navigate('FTPDetails', { 
              clientId: client.id,
              clientName: client.name,
              domain: client.domain 
            })}
          />

          <ServiceButton
            icon={Database}
            title="SQL Baze"
            subtitle="Upravljanje bazama"
            iconColor="#8B5CF6"
            iconBgColor="#EDE9FE"
            onPress={() => navigation.navigate('Database', { 
              clientId: client.id,
              clientName: client.name,
              domain: client.domain 
            })}
          />

          <ServiceButton
            icon={Mail}
            title="Email Nalozi"
            subtitle="Kreiranje i upravljanje"
            iconColor="#10B981"
            iconBgColor="#D1FAE5"
            onPress={() => navigation.navigate('EmailManagement', { 
              clientId: client.id,
              clientName: client.name,
              domain: client.domain 
            })}
          />

          <ServiceButton
            icon={Server}
            title="Hosting Podešavanja"
            subtitle="Konfiguracija hosting paketa"
            iconColor="#3B82F6"
            iconBgColor="#DBEAFE"
            onPress={() => {
              // TODO: Implementirati hosting settings
            }}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E31E24',
    marginLeft: 4,
  },
  clientInfoContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E31E24',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  clientCompany: {
    fontSize: 14,
    color: '#64748B',
  },
  domainCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  domainLabel: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 8,
  },
  domainValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  serviceCard: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  serviceCardInner: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  serviceCard: {
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    marginBottom: 12,
  },
  serviceCardLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 4,
  },
  serviceCardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  bottomSpacing: {
    height: 32,
  },
});

export default ClientPortalScreen;