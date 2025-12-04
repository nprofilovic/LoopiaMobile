// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, User, Bell, Lock, Info, ChevronRight } from 'lucide-react-native';
import LoopiaLogo from '../components/LoopiaLogo';
import { useAuth } from '../context/AuthContext';

const SettingsScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Odjava',
      'Da li ste sigurni da želite da se odjavite?',
      [
        { text: 'Otkaži', style: 'cancel' },
        { 
          text: 'Odjavi se', 
          style: 'destructive',
          onPress: logout 
        },
      ]
    );
  };

  const handleProfile = () => {
    Alert.alert('Profil', 'Podešavanja profila uskoro...');
  };

  const handleNotifications = () => {
    Alert.alert('Notifikacije', 'Podešavanja notifikacija uskoro...');
  };

  const handleSecurity = () => {
    Alert.alert('Sigurnost', 'Sigurnosna podešavanja uskoro...');
  };

  const handleAbout = () => {
    Alert.alert(
      'O Aplikaciji',
      'Loopia Distributer Panel\nVerzija 1.0.0\n\nRazvojni tim:\nVaša kompanija\n\n© 2024 Sva prava zadržana',
      [{ text: 'OK' }]
    );
  };

  const SettingItem = ({ icon: Icon, title, subtitle, onPress, showChevron = true }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Icon width={20} height={20} color="#64748B" />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && <ChevronRight width={20} height={20} color="#CBD5E1" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <LoopiaLogo />
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.username}>{user?.username || 'Korisnik'}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>Distributer</Text>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NALOG</Text>
          <View style={styles.card}>
            <SettingItem
              icon={User}
              title="Profil"
              subtitle="Lične informacije i podešavanja"
              onPress={handleProfile}
            />
            <View style={styles.divider} />
            <SettingItem
              icon={Bell}
              title="Notifikacije"
              subtitle="Push notifikacije i alerti"
              onPress={handleNotifications}
            />
            <View style={styles.divider} />
            <SettingItem
              icon={Lock}
              title="Sigurnost"
              subtitle="Lozinka i autentifikacija"
              onPress={handleSecurity}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIJE</Text>
          <View style={styles.card}>
            <SettingItem
              icon={Info}
              title="O aplikaciji"
              subtitle="Verzija 1.0.0"
              onPress={handleAbout}
            />
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Vaša Statistika</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>47</Text>
              <Text style={styles.statLabel}>Klijenti</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>89</Text>
              <Text style={styles.statLabel}>Servisi</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Računi</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogOut width={20} height={20} color="#E31E24" />
            <Text style={styles.logoutText}>Odjavi se</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Loopia Distributer Panel</Text>
          <Text style={styles.footerVersion}>Verzija 1.0.0</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E31E24',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#E31E24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E31E24',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    paddingHorizontal: 4,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 68,
  },
  statsCard: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E31E24',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E31E24',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    color: '#CBD5E1',
  },
  bottomSpacing: {
    height: 32,
  },
});

export default SettingsScreen;