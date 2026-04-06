import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { COLORS, SIZES } from '../utils/theme';
import Icon from 'react-native-vector-icons/Feather';

const InsightsScreen = () => {
  const { list } = useSelector(state => state.transaction);

  // 1. Data Processing
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

  let totalExpense = 0;

  list.forEach(item => {
    if (item.type.toLowerCase() === 'expense') {
      // Case-insensitive check
      totalExpense += item.amount;
      if (item.title.toLowerCase().includes('food'))
        data[0].population += item.amount;
      else if (item.title.toLowerCase().includes('shop'))
        data[1].population += item.amount;
      else data[2].population += item.amount;
    }
  });

  // 2. Placeholder data agar koi expense na ho
  const placeholderData = [
    {
      name: 'No Data',
      population: 1,
      color: '#E0E0E0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.heading}>
        <Text style={styles.mainTitle}>Financial Insights</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Expense Structure</Text>

          {totalExpense === 0 ? (
            <View style={styles.emptyStateContainer}>
              <View style={styles.emptyCircle}>
                <Icon name="pie-chart" size={32} color={COLORS.grey} />
              </View>

              <Text style={styles.emptyTitle}>No Expenses Yet</Text>
              <Text style={styles.emptySubtitle}>
                Start adding expenses to see your spending breakdown
              </Text>
            </View>
          ) : (
            // REAL CHART
            <PieChart
              data={data}
              width={Dimensions.get('window').width - 80}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              absolute
            />
          )}
        </View>

        <View
          style={[
            styles.insightBox,
            totalExpense === 0 && {
              backgroundColor: '#ffffff',
              borderLeftColor: COLORS.darkGrey,
            },
          ]}
        >
          <View style={styles.iconCircle}>
            <Icon
              name={totalExpense === 0 ? 'info' : 'zap'}
              size={24}
              color={totalExpense === 0 ? COLORS.darkGrey : COLORS.warning}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.insightHeadline}>
              {totalExpense === 0 ? 'Getting Started' : 'Smart Tip'}
            </Text>
            <Text style={styles.insightText}>
              {totalExpense === 0
                ? 'Start adding your daily expenses to see a detailed breakdown of your spending habits.'
                : "Your 'Others' category is high. Try using keywords like 'Food' or 'Shopping' in titles for better insights."}
            </Text>
          </View>
        </View>
      </ScrollView>
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
  heading: {
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  insightText: {
    color: COLORS.grey,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    marginTop: 10,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
    textAlign: 'center',
  },
  insightBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF4E6',
    padding: 20,
    marginTop: 20,
    borderRadius: 20,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.warning,
  },
  insightHeadline: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
  },
  insightText: {
    color: COLORS.grey,
    lineHeight: 20,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 30,
},

emptyCircle: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: '#F3F4F6',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
},

emptyTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: COLORS.black,
},

emptySubtitle: {
  fontSize: 13,
  color: COLORS.grey,
  textAlign: 'center',
  marginTop: 5,
  paddingHorizontal: 20,
},
});
