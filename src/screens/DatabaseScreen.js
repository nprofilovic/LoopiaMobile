// src/screens/DatabaseScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, Menu, Database, Copy, Eye, EyeOff, Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoopiaLogo from '../components/LoopiaLogo';

const DatabaseScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Podaci o klijentu prosleđeni iz ClientPortalScreen
  const { clientName, domain } = route.params || {
    clientName: 'Petar Petrović',
    domain: 'petshop-rex.rs',
  };

  // Mock data - kasnije ćemo dobiti iz API-ja
  const [databases] = useState([
    {
      id: '1',
      name: 'petshop_main',
      host: 'mysql.petshop-rex.rs',
      username: 'petshop_user',
      password: 'dbPass123!',
      created: '15.01.2024',
      size: '45 MB',
    },
    {
      id: '2',
      name: 'petshop_backup',
      host: 'mysql.petshop-rex.rs',
      username: 'petshop_backup',
      password: 'backupPass456!',
      created: '20.02.2024',
      size: '12 MB',
    },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = (text, label) => {
    Alert.alert('Kopirano!', `${label} je kopiran u clipboard`);
  };

  const handleCreateDatabase = () => {
    Alert.alert(
      'Kreiraj Bazu',
      'Funkcionalnost za kreiranje baze podataka uskoro...',
      [
        { text: 'Otkaži', style: 'cancel' },
        { text: 'Nastavi', onPress: () => console.log('Create database') },
      ]
    );
  };

  const handleDeleteDatabase = (db) => {
    Alert.alert(
      'Obriši Bazu',
      `Da li ste sigurni da želite da obrišete bazu ${db.name}? Svi podaci će biti trajno obrisani.`,
      [
        { text: 'Otkaži', style: 'cancel' },
        { 
          text: 'Obriši', 
          style: 'destructive',
          onPress: () => console.log('Delete database:', db.name) 
        },
      ]
    );
  };

  const handleManageDatabase = (db) => {
    Alert.alert(
      db.name,
      'Izaberi akciju',
      [
        { text: 'Promeni Lozinku', onPress: () => console.log('Change password') },
        { text: 'Izvezi Backup', onPress: () => console.log('Export backup') },
        { 
          text: 'Obriši Bazu', 
          onPress: () => handleDeleteDatabase(db),
          style: 'destructive' 
        },
        { text: 'Otkaži', style: 'cancel' },
      ]
    );
  };

  const DatabaseCard = ({ database }) => {
    const isPasswordVisible = visiblePasswords[database.id];

    return (
      <View style={styles.databaseCard}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <View style={styles.cardIcon}>
              <Database width={20} height={20} color="#8B5CF6" />
            </View>
            <View>
              <Text style={styles.databaseName}>{database.name}</Text>
              <Text style={styles.databaseMeta}>
                Kreirana: {database.created} • {database.size}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.menuIconButton}
            onPress={() => handleManageDatabase(database)}
          >
            <Menu width={18} height={18} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Credentials */}
        <View style={styles.credentialsContainer}>
          {/* Host */}
          <View style={styles.credentialRow}>
            <Text style={styles.credentialLabel}>Host:</Text>
            <Text style={styles.credentialValue}>{database.host}</Text>
            <TouchableOpacity
              style={styles.smallCopyButton}
              onPress={() => copyToClipboard(database.host, 'Host')}
            >
              <Copy width={14} height={14} color="#8B5CF6" />
            </TouchableOpacity>
          </View>

          {/* Username */}
          <View style={styles.credentialRow}>
            <Text style={styles.credentialLabel}>Username:</Text>
            <Text style={styles.credentialValue}>{database.username}</Text>
            <TouchableOpacity
              style={styles.smallCopyButton}
              onPress={() => copyToClipboard(database.username, 'Username')}
            >
              <Copy width={14} height={14} color="#8B5CF6" />
            </TouchableOpacity>
          </View>

          {/* Password */}
          <View style={styles.credentialRow}>
            <Text style={styles.credentialLabel}>Password:</Text>
            <Text style={styles.credentialValue}>
              {isPasswordVisible ? database.password : '••••••••'}
            </Text>
            <TouchableOpacity
              style={styles.smallIconButton}
              onPress={() => togglePasswordVisibility(database.id)}
            >
              {isPasswordVisible ? (
                <EyeOff width={14} height={14} color="#64748B" />
              ) : (
                <Eye width={14} height={14} color="#64748B" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallCopyButton}
              onPress={() => copyToClipboard(database.password, 'Password')}
            >
              <Copy width={14} height={14} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert('phpMyAdmin', 'Otvaranje phpMyAdmin...')}
          >
            <Text style={styles.actionButtonText}>Otvori phpMyAdmin</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
            <Text style={styles.backButtonText}>Portal klijenta</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SQL Baze</Text>
          <Text style={styles.subtitle}>{domain}</Text>
        </View>

        {/* Create Database Button */}
        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateDatabase}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButtonGradient}
            >
              <Database width={20} height={20} color="#FFFFFF" />
              <Text style={styles.createButtonText}>Kreiraj Novu Bazu</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Databases List */}
        <View style={styles.databasesSection}>
          <Text style={styles.sectionTitle}>
            POSTOJEĆE BAZE ({databases.length})
          </Text>
          
          {databases.map((database) => (
            <DatabaseCard key={database.id} database={database} />
          ))}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Saveti za Baze Podataka</Text>
          <Text style={styles.infoText}>
            • Redovno pravite backup važnih podataka{'\n'}
            • Koristite jake lozinke za database korisnike{'\n'}
            • Ograničite pristup samo na potrebne IP adrese{'\n'}
            • Optimizujte upite i indekse za bolje performanse{'\n'}
            • Pratite veličinu baze i očistite stare podatke
          </Text>
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
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  createButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  createButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  databasesSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  databaseCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  databaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  databaseMeta: {
    fontSize: 12,
    color: '#64748B',
  },
  menuIconButton: {
    padding: 8,
  },
  credentialsContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  credentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  credentialLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    width: 80,
  },
  credentialValue: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#1E293B',
  },
  smallIconButton: {
    padding: 4,
    marginLeft: 4,
  },
  smallCopyButton: {
    padding: 4,
    marginLeft: 4,
  },
  cardActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#EDE9FE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  infoCard: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});

export default DatabaseScreen;