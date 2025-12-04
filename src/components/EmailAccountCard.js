// src/components/EmailAccountCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu } from 'lucide-react-native';

const EmailAccountCard = ({ 
  account,
  onChangePassword,
  onSettings,
  onMenu,
  style 
}) => {
  const { 
    email, 
    storage, // Format: "245 MB / 1 GB"
    created,
    storagePercent // Opciono, ako nije prosleđen, izračunava se
  } = account;

  // Izračunaj procenat skladišta ako nije prosleđen
  const calculateStoragePercent = () => {
    if (storagePercent !== undefined) return storagePercent;
    
    if (storage) {
      const [used, total] = storage.split(' / ');
      const usedMB = parseFloat(used);
      const totalMB = parseFloat(total) * (total.includes('GB') ? 1024 : 1);
      return Math.round((usedMB / totalMB) * 100);
    }
    return 0;
  };

  const percent = calculateStoragePercent();

  // Boja progress bara na osnovu popunjenosti
  const getStorageColor = () => {
    if (percent >= 90) return '#EF4444'; // Crvena
    if (percent >= 75) return '#F59E0B'; // Narandžasta
    return '#10B981'; // Zelena
  };

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.emailInfo}>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.created}>Kreiran: {created}</Text>
        </View>

        {/* Menu dugme */}
        {onMenu && (
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={onMenu}
            activeOpacity={0.7}
          >
            <Menu width={18} height={18} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>

      {/* Storage Progress Bar */}
      <View style={styles.storageSection}>
        <View style={styles.storageLabelRow}>
          <Text style={styles.storageLabel}>Skladište</Text>
          <Text style={styles.storageText}>{storage}</Text>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${percent}%`,
                backgroundColor: getStorageColor()
              }
            ]} 
          />
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {onChangePassword && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={onChangePassword}
            activeOpacity={0.7}
          >
            <Text style={styles.primaryButtonText}>Promeni Lozinku</Text>
          </TouchableOpacity>
        )}

        {onSettings && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={onSettings}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Podešavanja</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 12,
    // Shadow za iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    // Elevation za Android
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  emailInfo: {
    flex: 1,
  },
  email: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  created: {
    fontSize: 12,
    color: '#64748B',
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storageSection: {
    marginBottom: 12,
  },
  storageLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  storageLabel: {
    fontSize: 12,
    color: '#475569',
  },
  storageText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FEE2E2',
  },
  primaryButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E31E24',
  },
  secondaryButton: {
    backgroundColor: '#F1F5F9',
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
});

export default EmailAccountCard;