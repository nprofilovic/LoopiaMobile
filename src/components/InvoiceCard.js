// src/components/InvoiceCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Eye, Download } from 'lucide-react-native';

const InvoiceCard = ({ 
  invoice,
  onView,
  onDownload,
  style 
}) => {
  const { 
    client, 
    invoiceNumber, 
    amount, 
    dueDate, 
    status = 'pending' // 'pending' | 'overdue' | 'paid'
  } = invoice;

  // Stilovi i tekstovi za status
  const getStatusStyle = () => {
    switch (status) {
      case 'overdue':
        return {
          backgroundColor: '#FEF3C7',
          textColor: '#92400E',
          label: 'Dospeo',
          containerBg: '#FEF3C7',
          borderColor: '#FDE68A',
        };
      case 'paid':
        return {
          backgroundColor: '#D1FAE5',
          textColor: '#065F46',
          label: 'Plaćen',
          containerBg: '#FFFFFF',
          borderColor: '#E2E8F0',
        };
      case 'pending':
      default:
        return {
          backgroundColor: '#DBEAFE',
          textColor: '#1E40AF',
          label: 'Aktivan',
          containerBg: '#FFFFFF',
          borderColor: '#E2E8F0',
        };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: statusStyle.containerBg,
          borderColor: statusStyle.borderColor,
        },
        style
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{client}</Text>
          <Text style={styles.invoiceNumber}>{invoiceNumber}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
          <View 
            style={[
              styles.statusBadge, 
              { backgroundColor: statusStyle.backgroundColor }
            ]}
          >
            <Text 
              style={[
                styles.statusText, 
                { color: statusStyle.textColor }
              ]}
            >
              {statusStyle.label}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.dueDate}>Rok: {dueDate}</Text>

        <View style={styles.actions}>
          {/* View button */}
          {onView && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={onView}
              activeOpacity={0.7}
            >
              <Eye width={16} height={16} color="#64748B" />
            </TouchableOpacity>
          )}

          {/* Download button */}
          {onDownload && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.downloadButton]}
              onPress={onDownload}
              activeOpacity={0.7}
            >
              <Download width={16} height={16} color="#E31E24" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    overflow: 'hidden',
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
    padding: 16,
    paddingBottom: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  dueDate: {
    fontSize: 12,
    color: '#64748B',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#FEE2E2',
  },
});

export default InvoiceCard;