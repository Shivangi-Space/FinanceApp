import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, SIZES } from '../utils/theme';
import Shimmer from '../components/Shimmer';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { deleteTransaction } from '../redux/transactionSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetching data from Redux store
  const { list, balance, income, expense } = useSelector(
    state => state.transaction,
  );

  const filteredList = list.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
  }

  const handleDelete = id => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteTransaction(id)),
        },
      ],
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.userName}>Finance Pro</Text>
        </View>
        <TouchableOpacity style={styles.profileCircle}>
          <Icon name="user" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <LinearGradient
        colors={[COLORS.primary, '#3A0CA3']}
        style={styles.balanceCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₹{balance.toLocaleString()}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Icon name="arrow-down-left" size={20} color={COLORS.success} />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statValue}>+ ₹{income}</Text>
            </View>
          </View>
          <View style={[styles.statItem, { alignItems: 'flex-end' }]}>
            <View style={{ marginRight: 8, alignItems: 'flex-end' }}>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statValue}>- ₹{expense}</Text>
            </View>
            <Icon name="arrow-up-right" size={20} color={COLORS.danger} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Target: New Laptop</Text>
          <Text style={styles.goalPercent}>40%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '40%' }]} />
        </View>
        <Text style={styles.goalSub}>₹20,000 of ₹50,000 saved</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>

            <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.darkGrey} style={{marginLeft: 10}} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor={COLORS.darkGrey}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="x-circle" size={18} color={COLORS.darkGrey} style={{marginRight: 10}} />
          </TouchableOpacity>
        )}
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.transactionItem}
            onPress={() => navigation.navigate('AddTransaction', {item})}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
            >
              {/* Category Icon Placeholder */}
              <View style={styles.iconBg}>
                <Icon
                  name={
                    item.type === 'Income' ? 'trending-up' : 'trending-down'
                  }
                  size={16}
                  color={
                    item.type === 'Income' ? COLORS.success : COLORS.danger
                  }
                />
              </View>

              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: COLORS.black,
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.darkGrey }}>
                  {item.category}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={[
                  styles.transAmount,
                  {
                    color:
                      item.type === 'Income' ? COLORS.success : COLORS.danger,
                  },
                ]}
              >
                {item.type === 'Income' ? '+' : '-'} ₹{item.amount}
              </Text>

              {/* DELETE BUTTON */}
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={{ marginTop: 5 }}
              >
                <Icon name="trash-2" size={16} color={COLORS.darkGrey} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No transactions yet!</Text>
          </View>
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
    backgroundColor: '#F0F2F5',
  },
  header: {
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.darkGrey,
    fontWeight: '500',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  profileCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 20,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: COLORS.black,
  },

  balanceCard: {
    borderRadius: 24,
    padding: 25,
    elevation: 12,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  balanceAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  statValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  goalCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  goalTitle: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
  goalPercent: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  goalSub: {
    fontSize: 12,
    color: COLORS.darkGrey,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    color: COLORS.black,
    marginBottom: 0,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  transAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {
    color: 'white',
    fontSize: 32,
    lineHeight: 32,
  },
  empty: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
