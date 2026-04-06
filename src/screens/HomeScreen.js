import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SIZES } from '../utils/theme';
import Shimmer from '../components/Shimmer';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  // Fetching data from Redux store
  const { list, balance, income, expense } = useSelector(
    state => state.transaction,
  );

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 20, paddingTop: 50 }}>
        <Shimmer width={150} height={20} />
        <View style={{ marginTop: 20 }}>
          <Shimmer width={'100%'} height={150} borderRadius={15} />
          <View style={{ marginTop: 30 }}>
            <Shimmer width={100} height={20} />
            <View style={{ marginTop: 15, gap: 10 }}>
              <Shimmer width={'100%'} height={60} />
              <Shimmer width={'100%'} height={60} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.welcomeText}>Good Morning,</Text>
      <Text style={styles.userName}>Finance Pro</Text>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₹{balance.toLocaleString()}</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.incomeExpenseTitle}>Income</Text>
            <Text style={styles.incomeAmount}>+ ₹{income}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.incomeExpenseTitle}>Expenses</Text>
            <Text style={styles.expenseAmount}>- ₹{expense}</Text>
          </View>
        </View>
      </View>

      {/* Savings Goal Card */}
      <View
        style={[
          styles.card,
          {
            marginTop: 20,
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 12,
          },
        ]}
      >
        <Text style={{ fontWeight: 'bold' }}>Goal: New Laptop (₹50,000)</Text>
        <View
          style={{
            height: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: '40%',
              height: 10,
              backgroundColor: COLORS.secondary,
              borderRadius: 5,
            }}
          />
        </View>
        <Text style={{ fontSize: 12, color: COLORS.grey, marginTop: 5 }}>
          ₹20,000 saved (40%)
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View>
              <Text style={styles.transName}>{item.title}</Text>
              <Text style={styles.transCategory}>{item.category}</Text>
            </View>
            <Text
              style={[
                styles.transAmount,
                {
                  color:
                    item.type === 'Income' ? COLORS.secondary : COLORS.danger,
                },
              ]}
            >
              {item.type === 'Income' ? '+' : '-'} ₹{item.amount}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions yet!</Text>
        }
      />

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    padding: SIZES.padding,
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 16,
    color: COLORS.grey,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    padding: 25,
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  balanceTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  balanceAmount: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  incomeExpenseTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  incomeAmount: {
    color: '#4ADE80',
    fontSize: 18,
    fontWeight: 'bold',
  },
  expenseAmount: {
    color: '#F87171',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    color: COLORS.black,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    marginVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  transName: {
    fontSize: 16,
    fontWeight: '600',
  },
  transCategory: {
    fontSize: 12,
    color: COLORS.grey,
  },
  transAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 32,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: COLORS.grey,
  },
});

export default HomeScreen;
