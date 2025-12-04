// src/screens/EmailManagementScreen.js
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
import { ChevronLeft, Menu, Mail } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoopiaLogo from '../components/LoopiaLogo';
import EmailAccountCard from '../components/EmailAccountCard';

const EmailManagementScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);

  // Podaci o klijentu prosleđeni iz ClientPortalScreen
  const { clientName, domain } = route.params || {
    clientName: 'Petar Petrović',
    domain: 'petshop-rex.rs',
  };

  // Mock data - kasnije ćemo dobiti iz API-ja
  const [emailAccounts] = useState([
    {
      id: '1',
      email: 'info@petshop-rex.rs',
      storage: '245 MB / 1 GB',
      storagePercent: 24,
      created: '15.01.2024',
    },
    {
      id: '2',
      email: 'podrska@petshop-rex.rs',
      storage: '89 MB / 1 GB',
      storagePercent: 8,
      created: '15.01.2024',
    },
    {
      id: '3',
      email: 'prodaja@petshop-rex.rs',
      storage: '512 MB / 2 GB',
      storagePercent: 25,
      created: '20.02.2024',
    },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Ovde će biti API poziv za refresh podataka
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleCreateEmail = () => {
    Alert.alert(
      'Kreiraj Email',
      'Funkcionalnost za kreiranje email naloga uskoro...',
      [
        {
          text: 'Otkaži',
          style: 'cancel',
        },
        {
          text: 'Nastavi',
          onPress: () => {
            // TODO: Navigacija na formu za kreiranje email naloga
            console.log('Create email account');
          },
        },
      ]
    );
  };

  const handleChangePassword = (account) => {
    Alert.alert(
      'Promeni Lozinku',
      `Promena lozinke za ${account.email}`,
      [
        { text: 'Otkaži', style: 'cancel' },
        { text: 'Promeni', onPress: () => console.log('Change password:', account.email) },
      ]
    );
  };

  const handleSettings = (account) => {
    Alert.alert(
      'Podešavanja',
      `Podešavanja za ${account.email}`,
      [
        { text: 'OK' },
      ]
    );
  };

  const handleMenu = (account) => {
    Alert.alert(
      account.email,
      'Izaberi akciju',
      [
        { text: 'Promeni Lozinku', onPress: () => handleChangePassword(account) },
        { text: 'Podešavanja', onPress: () => handleSettings(account) },
        { 
          text: 'Obriši Nalog', 
          onPress: () => handleDeleteAccount(account),
          style: 'destructive' 
        },
        { text: 'Otkaži', style: 'cancel' },
      ]
    );
  };

  const handleDeleteAccount = (account) => {
    Alert.alert(
      'Obriši Email Nalog',
      `Da li ste sigurni da želite da obrišete ${account.email}? Ova akcija se ne može poništiti.`,
      [
        { text: 'Otkaži', style: 'cancel' },
        { 
          text: 'Obriši', 
          style: 'destructive',
          onPress: () => console.log('Delete account:', account.email) 
        },
      ]
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
          <Text style={styles.title}>Email Nalozi</Text>
          <Text style={styles.subtitle}>{domain}</Text>
        </View>

        {/* Create Email Button */}
        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateEmail}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButtonGradient}
            >
              <Mail width={20} height={20} color="#FFFFFF" />
              <Text style={styles.createButtonText}>Kreiraj Novi Email</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Email Accounts List */}
        <View style={styles.accountsSection}>
          <Text style={styles.accountsTitle}>
            POSTOJEĆI NALOZI ({emailAccounts.length})
          </Text>
          
          {emailAccounts.map((account) => (
            <EmailAccountCard
              key={account.id}
              account={account}
              onChangePassword={() => handleChangePassword(account)}
              onSettings={() => handleSettings(account)}
              onMenu={() => handleMenu(account)}
            />
          ))}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Saveti za Email Naloge</Text>
          <Text style={styles.infoText}>
            • Koristite jake lozinke sa najmanje 12 karaktera{'\n'}
            • Redovno proveravajte iskorišćenost skladišta{'\n'}
            • Omogućite spam filter za zaštitu{'\n'}
            • Konfigurirajte email forwarder po potrebi
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
    shadowColor: '#10B981',
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
  accountsSection: {
    paddingHorizontal: 16,
  },
  accountsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
    letterSpacing: 0.5,
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

export default EmailManagementScreen;