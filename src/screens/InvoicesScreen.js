// src/screens/InvoicesScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Menu } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoopiaLogo from '../components/LoopiaLogo';
import InvoiceCard from '../components/InvoiceCard';

const InvoicesScreen = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('overdue');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - kasnije ćemo zameniti sa API podacima
  const [invoices] = useState([
    {
      id: '1',
      client: 'Petar Petrović',
      invoiceNumber: 'INV-2024-001',
      amount: '€35.00',
      dueDate: '05.12.2024',
      status: 'overdue',
    },
    {
      id: '2',
      client: 'Marko Marković',
      invoiceNumber: 'INV-2024-002',
      amount: '€120.00',
      dueDate: '10.12.2024',
      status: 'pending',
    },
    {
      id: '3',
      client: 'Ana Anić',
      invoiceNumber: 'INV-2024-003',
      amount: '€45.00',
      dueDate: '12.12.2024',
      status: 'pending',
    },
    {
      id: '4',
      client: 'Jovan Jovanović',
      invoiceNumber: 'INV-2024-004',
      amount: '€85.00',
      dueDate: '01.12.2024',
      status: 'overdue',
    },
    {
      id: '5',
      client: 'Sara Sarić',
      invoiceNumber: 'INV-2024-005',
      amount: '€25.00',
      dueDate: '15.12.2024',
      status: 'pending',
    },
    {
      id: '6',
      client: 'Milan Milić',
      invoiceNumber: 'INV-2024-006',
      amount: '€95.00',
      dueDate: '20.11.2024',
      status: 'overdue',
    },
    {
      id: '7',
      client: 'Jovana Jovičić',
      invoiceNumber: 'INV-2024-007',
      amount: '€150.00',
      dueDate: '25.11.2024',
      status: 'paid',
    },
    {
      id: '8',
      client: 'Nikola Nikolić',
      invoiceNumber: 'INV-2024-008',
      amount: '€200.00',
      dueDate: '18.11.2024',
      status: 'paid',
    },
  ]);

  const filters = [
    { 
      id: 'overdue', 
      label: 'Dospeli', 
      count: invoices.filter(i => i.status === 'overdue').length 
    },
    { 
      id: 'pending', 
      label: 'Aktivni', 
      count: invoices.filter(i => i.status === 'pending').length 
    },
    { 
      id: 'paid', 
      label: 'Plaćeni', 
      count: invoices.filter(i => i.status === 'paid').length 
    },
  ];

  // Kalkulacije
  const calculateTotals = () => {
    const unpaidInvoices = invoices.filter(i => i.status !== 'paid');
    const totalUnpaid = unpaidInvoices.reduce((sum, inv) => {
      const amount = parseFloat(inv.amount.replace('€', '').replace(',', ''));
      return sum + amount;
    }, 0);

    const avgInvoice = unpaidInvoices.length > 0 
      ? totalUnpaid / unpaidInvoices.length 
      : 0;

    return {
      totalUnpaid: totalUnpaid.toFixed(2),
      unpaidCount: unpaidInvoices.length,
      avgInvoice: avgInvoice.toFixed(2),
    };
  };

  const totals = calculateTotals();

  // Filterovanje računa
  const getFilteredInvoices = () => {
    return invoices.filter(invoice => invoice.status === selectedFilter);
  };

  const filteredInvoices = getFilteredInvoices();

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleViewInvoice = (invoice) => {
    Alert.alert(
      'Račun',
      `${invoice.invoiceNumber}\n${invoice.client}\n${invoice.amount}`,
      [{ text: 'OK' }]
    );
  };

  const handleDownloadInvoice = (invoice) => {
    Alert.alert(
      'Download',
      `Preuzimanje računa ${invoice.invoiceNumber}...`,
      [{ text: 'OK' }]
    );
  };

  const renderHeader = () => (
    <>
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

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Računi</Text>
        <Text style={styles.subtitle}>Pregled faktura na naplatu</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryContainer}>
        <LinearGradient
          colors={['#E31E24', '#C11117', '#E91E8C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryCard}
        >
          <Text style={styles.summaryLabel}>Ukupno za naplatu</Text>
          <Text style={styles.summaryAmount}>€{totals.totalUnpaid}</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatLabel}>Neplaćeno</Text>
              <Text style={styles.summaryStatValue}>{totals.unpaidCount} računa</Text>
            </View>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatLabel}>Prosečan račun</Text>
              <Text style={styles.summaryStatValue}>€{totals.avgInvoice}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter.id && styles.filterButtonTextActive,
              ]}
            >
              {filter.label} ({filter.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nema računa</Text>
      <Text style={styles.emptySubtext}>
        Trenutno nemate račune u ovoj kategoriji
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InvoiceCard
            invoice={item}
            onView={() => handleViewInvoice(item)}
            onDownload={() => handleDownloadInvoice(item)}
            style={styles.invoiceCard}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
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
  summaryContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
  },
  summaryCard: {
    borderRadius: 12,
    padding: 20,
  },
  summaryLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
  },
  summaryStatItem: {
    flex: 1,
  },
  summaryStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: 4,
  },
  summaryStatValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#F59E0B',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  invoiceCard: {
    marginBottom: 0,
  },
  emptyContainer: {
    paddingVertical: 64,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default InvoicesScreen;