// src/screens/DashboardScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Bell, Menu, Users, FileText, Server } from 'lucide-react-native';
import LoopiaLogo from '../components/LoopiaLogo';
import StatCard from '../components/StatCard';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - kasnije ćemo zameniti sa pravim API podacima
  const [stats, setStats] = useState({
    totalClients: 47,
    invoicesThisMonth: 12,
    activeServices: 89,
    unpaidAmount: '€2,340',
  });

  const [recentActivities] = useState([
    {
      id: 1,
      client: 'Petar Petrović',
      action: 'Novi račun kreiran',
      time: '2 sata',
      color: 'red',
    },
    {
      id: 2,
      client: 'Marko Marković',
      action: 'Uplata primljena',
      time: '5 sati',
      color: 'green',
    },
    {
      id: 3,
      client: 'Ana Anić',
      action: 'Email nalog kreiran',
      time: '1 dan',
      color: 'purple',
    },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Ovde će biti API poziv za refresh podataka
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getActivityColor = (color) => {
    switch (color) {
      case 'red':
        return { bg: '#FEE2E2', dot: '#E31E24' };
      case 'green':
        return { bg: '#D1FAE5', dot: '#10B981' };
      case 'purple':
        return { bg: '#EDE9FE', dot: '#8B5CF6' };
      default:
        return { bg: '#F1F5F9', dot: '#64748B' };
    }
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
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell width={20} height={20} color="#64748B" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Menu width={20} height={20} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Page Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Pregled poslovanja</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard
              icon={Users}
              title="Ukupno Klijenata"
              value={stats.totalClients.toString()}
              colors={['#E31E24', '#C11117']}
              onPress={() => navigation.navigate('Clients')}
              style={styles.statCard}
            />
            <StatCard
              icon={FileText}
              title="Računi (ovaj mesec)"
              value={stats.invoicesThisMonth.toString()}
              colors={['#10B981', '#059669']}
              onPress={() => navigation.navigate('Invoices')}
              style={styles.statCard}
            />
          </View>

          <View style={styles.statsRow}>
            <StatCard
              icon={Server}
              title="Aktivni Servisi"
              value={stats.activeServices.toString()}
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.statCard}
            />
            <StatCard
              title="Neplaćeno"
              value={stats.unpaidAmount}
              colors={['#F59E0B', '#D97706']}
              onPress={() => navigation.navigate('Invoices')}
              style={styles.statCard}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brzi Pristup</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Clients')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEE2E2' }]}>
                <Users width={28} height={28} color="#E31E24" />
              </View>
              <Text style={styles.quickActionText}>Klijenti</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Invoices')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#D1FAE5' }]}>
                <FileText width={28} height={28} color="#10B981" />
              </View>
              <Text style={styles.quickActionText}>Računi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Clients')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#EDE9FE' }]}>
                <Server width={28} height={28} color="#8B5CF6" />
              </View>
              <Text style={styles.quickActionText}>Servisi</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nedavne Aktivnosti</Text>
          <View style={styles.activitiesContainer}>
            {recentActivities.map((activity) => {
              const colors = getActivityColor(activity.color);
              return (
                <View key={activity.id} style={styles.activityItem}>
                  <View
                    style={[
                      styles.activityIconContainer,
                      { backgroundColor: colors.bg },
                    ]}
                  >
                    <View
                      style={[
                        styles.activityDot,
                        { backgroundColor: colors.dot },
                      ]}
                    />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityClient}>{activity.client}</Text>
                    <Text style={styles.activityAction}>{activity.action}</Text>
                  </View>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              );
            })}
          </View>
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
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E31E24',
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
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
  statsContainer: {
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activitiesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityClient: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  activityAction: {
    fontSize: 12,
    color: '#64748B',
  },
  activityTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  bottomSpacing: {
    height: 32,
  },
});

export default DashboardScreen;