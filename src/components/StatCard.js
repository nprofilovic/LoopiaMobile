// src/components/StatCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  colors = ['#E31E24', '#C11117'],
  onPress,
  style 
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container 
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Ikona */}
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon width={24} height={24} color="#FFFFFF" opacity={0.8} />
          </View>
        )}

        {/* Naslov */}
        <Text style={styles.title}>{title}</Text>

        {/* Vrednost */}
        <Text style={styles.value}>{value}</Text>
      </LinearGradient>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 150,
  },
  gradient: {
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
});

export default StatCard;