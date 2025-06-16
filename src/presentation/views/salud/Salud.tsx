// src/components/Salud.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { RootStackParamList } from 'src/config/api/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Salud'>;
export const Salud = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* 👉 Header con fecha y navegación */}
      <View style={styles.header}>
        <Text style={styles.title}>Hoy</Text>
        {/* Aquí va el selector de fechas */}
      </View>

      {/* 👉 Sección de Estado de Ánimo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ánimo</Text>
        <View style={styles.moodList}>
          {/* Aquí puedes renderizar emojis con texto como en la imagen */}
        </View>
      </View>

      {/* 👉 Sección de medicina y otros datos */}
      <Pressable style={styles.card}
       onPress={() => navigation.navigate('SaludScreen')}
      >
        <Text style={styles.cardTitle}>Medicina</Text>
        {/* Aquí un ícono tipo píldora o botón */}
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Test de ovulación</Text>
        {/* Switches: positiva / negativa */}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Peso</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Temperatura</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Beber agua</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
});
