import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addTransaction, updateTransaction } from '../redux/transactionSlice';
import { COLORS, SIZES } from '../utils/theme';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddTransaction = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const editItem = route.params?.item;

  const [title, setTitle] = useState(editItem ? editItem.title : '');
  const [amount, setAmount] = useState(editItem ? editItem.amount.toString() : '');
  const [type, setType] = useState(editItem ? editItem.type : 'Expense');

  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (editItem) {
      // EDIT MODE
      dispatch(updateTransaction({
        id: editItem.id,
        updatedData: {
          title,
          amount: parseFloat(amount),
          type,
        }
      }));
    } else {
      // ADD MODE
      const newTransaction = {
        id: Date.now(),
        title,
        amount: parseFloat(amount),
        type,
        category: 'General',
        date: new Date().toLocaleDateString(),
      };
      dispatch(addTransaction(newTransaction));
    }
    
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={28} color={COLORS.black} />
          </TouchableOpacity>
          {/* <Text style={styles.headerTitle}>Add Transaction</Text> */}
           <Text style={styles.headerTitle}>{editItem ? 'Edit Entry' : 'Add New Entry'}</Text>
          <View style={{ width: 40 }} /> 
        </View>

        <View style={styles.form}>
          {/* Amount Input Large */}
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={COLORS.darkGrey}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              autoFocus
            />
          </View>

          <View style={styles.typeSelector}>
            <TouchableOpacity 
              onPress={() => setType('Income')}
              style={[
                styles.typeOption, 
                type === 'Income' && { backgroundColor: COLORS.success + '20', borderColor: COLORS.success }
              ]}
            >
              <Icon name="trending-up" size={20} color={type === 'Income' ? COLORS.success : COLORS.darkGrey} />
              <Text style={[styles.typeText, { color: type === 'Income' ? COLORS.success : COLORS.darkGrey }]}>Income</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setType('Expense')}
              style={[
                styles.typeOption, 
                type === 'Expense' && { backgroundColor: COLORS.danger + '20', borderColor: COLORS.danger }
              ]}
            >
              <Icon name="trending-down" size={20} color={type === 'Expense' ? COLORS.danger : COLORS.darkGrey} />
              <Text style={[styles.typeText, { color: type === 'Expense' ? COLORS.danger : COLORS.darkGrey }]}>Expense</Text>
            </TouchableOpacity>
          </View>

          {/* Title Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>What was this for?</Text>
            <View style={styles.inputBox}>
              <Icon name="edit-3" size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Monthly Grocery, Salary"
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>

          {/* Save Button with Gradient */}
          <TouchableOpacity onPress={handleSave} activeOpacity={0.8}>
            <LinearGradient
              colors={[COLORS.primary, '#3A0CA3']}
              style={styles.saveButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {/* <Text style={styles.saveButtonText}>Add Transaction</Text> */}
              <Text style={styles.saveButtonText}>
             {editItem ? 'Update Transaction' : 'Save Transaction'}
          </Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#F0F2F5',
    borderBottomWidth: 1
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  form: {
    flex: 1,
    padding: 25,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    borderWidth: 1,
    borderColor: '#F0F2F5',
    borderRadius: 15
  },
  currencySymbol: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 10,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.black,
    minWidth: 100,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#F0F2F5',
  },
  typeText: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputWrapper: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.darkGrey,
    marginBottom: 10,
    fontWeight: '600',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 55,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  saveButton: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});