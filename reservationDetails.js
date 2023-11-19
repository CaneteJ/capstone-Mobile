// ReservationDetailsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ReservationDetailsScreen = ({ route, navigation }) => {
  const { totalAmount, slotRequests } = route.params;

  const handleCancel = () => {
    // Implement cancel logic if needed
    // For demonstration purposes, navigate back to the reservation slots screen
    navigation.navigate('ReservationSlots');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation Details</Text>
      <Text>Total Amount: PHP{totalAmount}</Text>
      <Text>Slot Reservation Requests: {slotRequests.map((slot) => `Slot ${slot}`).join(', ')}</Text>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ReservationDetailsScreen;