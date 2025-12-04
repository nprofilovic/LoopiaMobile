// src/screens/ClientListScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, Menu } from 'lucide-react-native';
import LoopiaLogo from '../components/LoopiaLogo';
import ClientCard from '../components/ClientCard';

const ClientListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - kasnije ćemo zameniti sa API podacima
  const [clients] = useState([
    {
      id: '1',
      name: 'Petar Petrović',
      company: 'Pet Shop "Rex"',
      domain: 'petshop-rex.rs',
      services: 3,
      status: 'active',
    },
    {
      id: '2',
      name: 'Marko Marković',
      company: 'Marko IT Solutions',
      domain: 'marko-it.com',
      services: 5,
      status: 'active',
    },
    {
      id: '3',
      name: 'Ana Anić',
      company: 'Ana Design Studio',
      domain: 'ana-design.rs',
      services: 2,
      status: 'active',
    },
    {
      id: '4',
      name: 'Jovan Jovanović',
      company: 'Jovan Auto',
      domain: 'jovan-auto.rs',
      services: 4,
      status: 'warning',
    },
    {
      id: '5',
      name: 'Sara Sarić',
      company: 'Café Sara',
      domain: 'cafe-sara.rs',
      services: 1,
      status: 'active',
    },
    {
      id: '6',
      name: 'Milan Milić',
      company: 'Milan Elektro',
      domain: 'milan-elektro.rs',
      services: 3,
      status: 'inactive',
    },
    {
      id: '7',
      name: 'Jovana Jovičić',
      company: 'Jovana Web Design',
      domain: 'jovana-design.com',
      services: 2,
      status: 'active',
    },
    {
      id: '8',
      name: 'Nikola Nikolić',
      company: 'Nikola Consulting',
      domain: 'nikola-consulting.rs',
      services: 6,
      status: 'active',
    },
  ]);

  const filters = [
    { id: 'all', label: 'Svi', count: clients.length },
    { id: 'active', label: 'Aktivni', count: clients.filter(c => c.status === 'active').length },
    { id: 'inactive', label: 'Neaktivni', count: clients.filter(c => c.status === 'inactive').length },
  ];

  // Filterovanje klijenata
  const getFilteredClients = () => {
    let filtered = clients;

    // Filter po statusu
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(client => client.status === selectedFilter);
    }

    // Filter po pretazi
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        client =>
          client.name.toLowerCase().includes(query) ||
          client.company.toLowerCase().includes(query) ||
          client.domain.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredClients = getFilteredClients();

  const onRefresh = async () => {
    setRefreshing(true);
    // Ovde će biti API poziv za refresh podataka
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleClientPress = (client) => {
    navigation.navigate('ClientPortal', {
      clientId: client.id,
      clientName: client.name,
      clientData: client,
    });
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
        <Text style={styles.title}>Klijenti</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search
            width={20}
            height={20}
            color="#64748B"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Pretraži klijente..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
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
      <Text style={styles.emptyText}>Nema klijenata</Text>
      <Text style={styles.emptySubtext}>
        {searchQuery.trim()
          ? 'Pokušajte sa drugom pretragom'
          : 'Trenutno nemate klijente u ovoj kategoriji'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClientCard
            client={item}
            onPress={() => handleClientPress(item)}
            style={styles.clientCard}
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
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
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
    backgroundColor: '#E31E24',
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
  clientCard: {
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

export default ClientListScreen;