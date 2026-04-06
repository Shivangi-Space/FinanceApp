import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addTransation } from '../redux/transactionSlice';
import { COLORS, SIZES } from '../utils/theme';

const AddTransaction = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const dispatch = useDispatch();

  const handleSave = () => {
    if(!title || !amount) {
        Alert.alert('Error', 'Please fill all the details');
        return;
    }

    const newTransaction = {
        id: Date.now(),
        title,
        amount: parseFloat(amount),
        type,
        category: 'General',
        date: new Date().toLocaleDateString(),
    };
    dispatch(addTransaction(newTransaction));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Transaction Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Dinner, Salary"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Amount (₹)</Text>

      <TextInput
        style={styles.input}
        placeholder="0.00"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Type</Text>
      <View style={styles.typeContainer}>
        {['Income', 'Expense'].map(t => (
          <TouchableOpacity
            key={t}
            style={[
              styles.typeButton,
              type === t && { backgroundColor: COLORS.primary },
            ]}
            onPress={() => setType(t)}
          >
            <Text
              style={{
                color: type === t ? 'white' : 'black',
              }}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>
            Save Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.padding,
        backgroundColor: COLORS.background,
    },
    label: {
        fontSize: 14,
        color: COLORS.grey,
        marginBottom: 8,
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
    },
    typeContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    typeButton: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        padding: 18,
        borderRadius: 15,
        marginTop: 40,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
