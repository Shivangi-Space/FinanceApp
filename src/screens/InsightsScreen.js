import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { COLORS, SIZES } from '../utils/theme';

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
    <View style={styles.container}>
      <Text style={styles.title}>Spending Breakdown</Text>

      <PieChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{ color: (opacity = 1) => `rgba(0,0,0, ${opacity})` }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Smart Insight 💡</Text>

        <Text style={styles.insightText}>
          {data[0].population > data[1].population
            ? "You're spending a lot on Food. Try cooking at home!"
            : 'Shopping is your main expense this week.'}
        </Text>
      </View>
    </View>
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
    }
});


