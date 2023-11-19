
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SLOT_PRICE = 30;

export default function App() {
  const [reservedSlots, setReservedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const reserveSlot = (slotNumber) => {
    if (reservedSlots.includes(slotNumber)) {
      // If the selected slot is already reserved, ask for confirmation before canceling
      Alert.alert(
        'Confirmation',
        `Are you sure you want to cancel the reservation for Slot ${slotNumber}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setReservedSlots((prevSlots) => prevSlots.filter((slot) => slot !== slotNumber));
              setSelectedSlot(null);
              Alert.alert('Reservation Canceled', `Reservation for Slot ${slotNumber} canceled successfully!`);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      // Reserve the slot if it's not already reserved
      setSelectedSlot(slotNumber);
    }
  };

  const handleReservation = () => {
    if (selectedSlot !== null) {
      setReservedSlots([...reservedSlots, selectedSlot]);
      setSelectedSlot(null);
      Alert.alert('Reservation Request Successful', `Slot ${selectedSlot} request pending..`);
    } else {
      Alert.alert('No Slot Selected', 'Please select a slot before reserving.');
    }
  };

  const totalAmount = reservedSlots.length * SLOT_PRICE;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Slot Reservation</Text>

      <View style={styles.slotContainer}>
        {[...Array(10).keys()].map((slotNumber) => (
          <TouchableOpacity
            key={slotNumber}
            style={[
              styles.slotButton,
              reservedSlots.includes(slotNumber + 1) && styles.reservedSlotButton,
              selectedSlot === slotNumber + 1 && styles.selectedSlotButton,
            ]}
            onPress={() => reserveSlot(slotNumber + 1)}
          >
            <Text style={styles.slotButtonText}>{`Slot ${slotNumber + 1}\nPHP${SLOT_PRICE}`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.reserveButton}
        onPress={handleReservation}
        disabled={selectedSlot === null || reservedSlots.includes(selectedSlot)}
      >
        <Text style={styles.buttonText}>Reserve Slot</Text>
      </TouchableOpacity>

      <Text style={styles.totalAmountText}>Expected Total Amount: PHP{totalAmount}</Text>
      <Text style={styles.reservedSlotsText}>
       Slot Reservation Requests: {reservedSlots.map((slot) => `Slot ${slot}`).join(', ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  slotButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  reservedSlotButton: {
    backgroundColor: 'red', // Change color for reserved slots
  },
  selectedSlotButton: {
    backgroundColor: 'yellow', // Change color for selected slot
  },
  slotButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  reserveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  totalAmountText: {
    fontSize: 16,
    marginTop: 10,
  },
  reservedSlotsText: {
    fontSize: 16,
    marginTop: 20,
  },
});