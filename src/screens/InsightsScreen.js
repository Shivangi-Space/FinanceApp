import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { COLORS, SIZES } from '../utils/theme';
import Icon from 'react-native-vector-icons/Feather';

const InsightsScreen = () => {
  const { list } = useSelector(state => state.transaction);

  const data = [
    {
      name: 'Food',
      population: 0,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Shopping',
      population: 0,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Others',
      population: 0,
      color: '#FFCE56',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  list.forEach(item => {
    if (item.type === 'Expense') {
      if (item.title.toLowerCase().includes('food'))
        data[0].population += item.amount;
      else if (item.title.toLowerCase().includes('shop'))
        data[1].population += item.amount;
      else data[2].population += item.amount;
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Financial Insights</Text>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Expense Structure</Text>
        <PieChart
          data={data}
          width={Dimensions.get('window').width - 80}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
        />
      </View>

      <View style={styles.insightBox}>
        <View style={styles.iconCircle}>
          <Icon name="zap" size={24} color={COLORS.warning} />
        </View>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.insightHeadline}>Smart Tip</Text>
          <Text style={styles.insightText}>
            Your "Others" category is 100% of your budget. Try adding categories
            like Food or Rent for better tracking!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default InsightsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  insightText: {
    color: COLORS.grey,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    margin: 20,
    elevation: 5,
  },
  insightBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF4E6',
    padding: 20,
    margin: 20,
    borderRadius: 20,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.warning,
  },
});
