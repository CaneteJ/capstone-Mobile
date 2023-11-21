import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Swiper from 'react-native-swiper';
import ReservationDetailsScreen from './reservationDetails';

const SLOT_PRICE = 30;

export default function ReservationScreen() {
  const navigation = useNavigation(); // Initialize the useNavigation hook

  const [reservedSlots, setReservedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const reserveSlot = (slotNumber) => {
    if (reservedSlots.includes(slotNumber)) {
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
      // Check if the user has already reserved a slot
      if (reservedSlots.length > 0) {
        Alert.alert('Reservation Limit', 'You can only reserve one slot at a time.', [
          {
            text: 'OK',
            style: 'default',
          },
        ]);
      } else {
        setSelectedSlot(slotNumber);
      }
    }
  };

  const handleReservation = () => {
    if (selectedSlot !== null && !reservedSlots.includes(selectedSlot)) {
      // Show a confirmation alert before making the reservation
      Alert.alert(
        'Confirm Reservation',
        `Are you sure you want to reserve Slot ${selectedSlot}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              const updatedReservedSlots = [...reservedSlots, selectedSlot];
              setReservedSlots(updatedReservedSlots);
              setSelectedSlot(null);
  
              // Show a success alert after making the reservation
              Alert.alert(
                'Reservation Successful',
                `Slot ${selectedSlot} reserved successfully!`,
                [
                  {
                    text: 'OK',
                    style: 'default',
                  },
                ]
              );
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Invalid Reservation', 'Please select a valid slot before reserving.', [
        {
          text: 'OK',
          style: 'default',
        },
      ]);
    }
  };

//const handleReservation = () => {
  //if (selectedSlot !== null && !reservedSlots.includes(selectedSlot)) {
    //const updatedReservedSlots = [...reservedSlots, selectedSlot];
   // setReservedSlots(updatedReservedSlots);
   // setSelectedSlot(null);

   // navigation.navigate('reservationDetails', {
     // selectedSlot,
      //reservedSlots: updatedReservedSlots, // Pass the updated array
    //  totalAmount: updatedReservedSlots.length * SLOT_PRICE,
   // });
  //} else {
    //Alert.alert('Invalid Reservation', 'Please select a valid slot before reserving.', [
      //{
      //  text: 'OK',
      //  style: 'default',
    //  },
    //]);
  //}
//};

  const cancelReservation = (cancelledSlot) => {
    setReservedSlots((prevSlots) => prevSlots.filter((slot) => slot !== cancelledSlot));
  };


  const totalAmount = reservedSlots.length * SLOT_PRICE;

  return (
    <Swiper loop={false} showsPagination={false}>
      {/* Zone 1 */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Parking Slot Reservation</Text>
          <Text style={styles.zoneTitle}>ZONE 1 </Text>
          <Text style={styles.floorTitle}>A1 </Text>
    
          <View style={styles.slotContainer}>
            {[...Array(15).keys()].map((slotNumber) => (
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

          <Text style={styles.floorTitle}>A2</Text>
          <View style={styles.slotContainer}>
            {[...Array(15).keys()].map((slotNumber) => (
              <TouchableOpacity
                key={slotNumber}
                style={[
                  styles.slotButton,
                  reservedSlots.includes(slotNumber + 16) && styles.reservedSlotButton,
                  selectedSlot === slotNumber + 16 && styles.selectedSlotButton,
                ]}
                onPress={() => reserveSlot(slotNumber + 16)}
              >
                <Text style={styles.slotButtonText}>{`Slot ${slotNumber + 16}\nPHP${SLOT_PRICE}`}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Reserve Button */}
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
      </ScrollView>

      {/* Zone 2 */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Parking Slot Reservation</Text>
          <Text style={styles.zoneTitle}>ZONE 2 </Text>
          <Text style={styles.floorTitle}>B1 </Text>

          <View style={styles.slotContainer}>
            {[...Array(15).keys()].map((slotNumber) => (
              <TouchableOpacity
                key={slotNumber}
                style={[
                  styles.slotButton,
                  reservedSlots.includes(slotNumber + 16) && styles.reservedSlotButton,
                  selectedSlot === slotNumber + 16 && styles.selectedSlotButton,
                ]}
                onPress={() => reserveSlot(slotNumber + 16)}
              >
                <Text style={styles.slotButtonText}>{`Slot ${slotNumber + 16}\nPHP${SLOT_PRICE}`}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Reserve Button */}
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
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Parking Slot Reservation</Text>
          <Text style={styles.title}>ZONE 3</Text>
          <Text style={styles.title}>2nd Floor</Text>
        </View>
      </ScrollView>
    </Swiper>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  zoneTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  floorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  slotButton: {
    backgroundColor: '#3498db',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: 80,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reservedSlotButton: {
    backgroundColor: '#e74c3c', // Change color for reserved slots
  },
  selectedSlotButton: {
    backgroundColor: '#f39c12', // Change color for the selected slot
  },
  slotButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  reserveButton: {
    backgroundColor: '#2ecc71',
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