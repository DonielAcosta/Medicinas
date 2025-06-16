// import React, { useState } from 'react';
import React from 'react';
import {View,Text,StyleSheet,ScrollView,Pressable,Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

export const SaludScreen = () => {
  const currentDate = moment().format('YYYY-MM-DD HH:mm');

  const handleGuardar = () => {
    PushNotification.localNotification({
      title: 'Registro guardado',
      message: 'Tu información de salud ha sido registrada.',
    });

    Alert.alert('Guardado', 'Se ha registrado la información.');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Hoy - {currentDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ánimo</Text>
        <View style={styles.moodList}>
          {['😀', '😐', '😔', '😡', '😭'].map((emoji, idx) => (
            <View key={idx} style={styles.emojiCard}>
              <Text style={styles.emoji}>{emoji}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Cards */}
      {['Medicina', 'Test de ovulación', 'Peso', 'Temperatura', 'Beber agua'].map(
        (item, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.cardTitle}>{item}</Text>
          </View>
        )
      )}

      <Pressable style={styles.saveButton} onPress={handleGuardar}>
        <Text style={styles.saveText}>Guardar</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emojiCard: {
    width: 55,
    height: 55,
    backgroundColor: '#e3e3e3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  card: {
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#2e86de',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
