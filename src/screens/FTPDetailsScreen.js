// src/screens/FTPDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, Menu, HardDrive, Copy, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoopiaLogo from '../components/LoopiaLogo';

const FTPDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Podaci o klijentu prosleđeni iz ClientPortalScreen
  const { clientName, domain } = route.params || {
    clientName: 'Petar Petrović',
    domain: 'petshop-rex.rs',
  };

  // Mock FTP data - kasnije ćemo dobiti iz API-ja
  const ftpCredentials = {
    server: `ftp.${domain}`,
    port: '21',
    username: domain.replace(/\./g, '_') + '_ftp',
    password: 'SecurePass123!@#',
  };

  const copyToClipboard = (text, label) => {
    Clipboard.setString(text);
    Alert.alert('Kopirano!', `${label} je kopiran u clipboard`);
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Promeni FTP Lozinku',
      'Da li želite da promenite FTP lozinku?',
      [
        { text: 'Otkaži', style: 'cancel' },
        { 
          text: 'Promeni', 
          onPress: () => {
            // TODO: Navigacija na formu za promenu lozinke
            console.log('Change FTP password');
          }
        },
      ]
    );
  };

  const CredentialField = ({ label, value, copyLabel }) => (
    <View style={styles.credentialCard}>
      <Text style={styles.credentialLabel}>{label}</Text>
      <View style={styles.credentialRow}>
        <Text style={styles.credentialValue} numberOfLines={1}>
          {value}
        </Text>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => copyToClipboard(value, copyLabel || label)}
        >
          <Copy width={16} height={16} color="#E31E24" />
          <Text style={styles.copyButtonText}>Kopiraj</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
            <Text style={styles.backButtonText}>Portal klijenta</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>FTP Pristup</Text>
          <Text style={styles.subtitle}>{domain}</Text>
        </View>

        {/* FTP Info Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={['#E31E24', '#C11117', '#E91E8C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerIcon}>
              <HardDrive width={24} height={24} color="#FFFFFF" />
            </View>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>FTP Server</Text>
              <Text style={styles.bannerSubtitle}>Detalji za pristup</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Credentials Section */}
        <View style={styles.credentialsSection}>
          <Text style={styles.sectionTitle}>PRISTUPNI PODACI</Text>

          <CredentialField
            label="Server"
            value={ftpCredentials.server}
            copyLabel="Server adresa"
          />

          <CredentialField
            label="Port"
            value={ftpCredentials.port}
            copyLabel="Port"
          />

          <CredentialField
            label="Korisničko Ime"
            value={ftpCredentials.username}
            copyLabel="Korisničko ime"
          />

          {/* Password Field with Toggle */}
          <View style={styles.credentialCard}>
            <Text style={styles.credentialLabel}>Lozinka</Text>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialValue} numberOfLines={1}>
                {passwordVisible ? ftpCredentials.password : '••••••••••••'}
              </Text>
              <View style={styles.passwordActions}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <EyeOff width={16} height={16} color="#64748B" />
                  ) : (
                    <Eye width={16} height={16} color="#64748B" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(ftpCredentials.password, 'Lozinka')}
                >
                  <Copy width={16} height={16} color="#E31E24" />
                  <Text style={styles.copyButtonText}>Kopiraj</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Change Password Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.changePasswordButtonText}>
              Promeni FTP Lozinku
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recommended Clients */}
        <View style={styles.recommendationsCard}>
          <Text style={styles.recommendationsTitle}>
            Preporučeni FTP Klijenti
          </Text>
          <View style={styles.recommendationsList}>
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationBullet}>•</Text>
              <Text style={styles.recommendationText}>
                FileZilla (Windows, Mac, Linux)
              </Text>
            </View>
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationBullet}>•</Text>
              <Text style={styles.recommendationText}>
                Cyberduck (Mac, Windows)
              </Text>
            </View>
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationBullet}>•</Text>
              <Text style={styles.recommendationText}>
                WinSCP (Windows)
              </Text>
            </View>
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationBullet}>•</Text>
              <Text style={styles.recommendationText}>
                Transmit (Mac)
              </Text>
            </View>
          </View>
        </View>

        {/* Connection Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ Kako se povezati?</Text>
          <Text style={styles.infoText}>
            1. Preuzmite i instalirajte FTP klijent{'\n'}
            2. Kreirajte novu konekciju{'\n'}
            3. Unesite server, port, korisničko ime i lozinku{'\n'}
            4. Kliknite "Connect" ili "Poveži se"{'\n'}
            5. Nakon uspešne konekcije, možete prenositi fajlove
          </Text>
        </View>

        {/* Security Warning */}
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Sigurnosno Upozorenje</Text>
          <Text style={styles.warningText}>
            • Nikada ne delite FTP kredencijale sa neovlašćenim licima{'\n'}
            • Koristite jake lozinke sa kombinacijom slova, brojeva i simbola{'\n'}
            • Razmislite o korišćenju SFTP za dodatnu sigurnost{'\n'}
            • Redovno menjajte lozinku
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
  bannerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  banner: {
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  credentialsSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  credentialCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  credentialLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  credentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  credentialValue: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#1E293B',
    marginRight: 12,
  },
  passwordActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginRight: 4,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  copyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E31E24',
    marginLeft: 4,
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  changePasswordButton: {
    backgroundColor: '#E31E24',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#E31E24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  changePasswordButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  recommendationsCard: {
    marginHorizontal: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  recommendationsList: {
    gap: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recommendationBullet: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  infoCard: {
    marginHorizontal: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginBottom: 16,
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
  warningCard: {
    marginHorizontal: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});

export default FTPDetailsScreen;