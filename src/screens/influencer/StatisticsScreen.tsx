// src/screens/influencer/StatisticsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import apiClient from '../../api/apiClient';

// Mock data for demonstration
const MOCK_MONTHLY_DATA = [
  { month: 'Jan', revenue: 1200, orders: 24 },
  { month: 'Feb', revenue: 1400, orders: 28 },
  { month: 'Mar', revenue: 1100, orders: 22 },
  { month: 'Apr', revenue: 1800, orders: 36 },
  { month: 'May', revenue: 2200, orders: 44 },
  { month: 'Jun', revenue: 1950, orders: 39 },
];

const MOCK_TOP_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', sales: 42, revenue: 3360 },
  { id: 2, name: 'Smart Watch', sales: 38, revenue: 7600 },
  { id: 3, name: 'Bluetooth Speaker', sales: 35, revenue: 2450 },
  { id: 4, name: 'Phone Case', sales: 29, revenue: 580 },
  { id: 5, name: 'Power Bank', sales: 24, revenue: 960 },
];

const MOCK_ENGAGEMENT_STATS = {
  totalChats: 247,
  avgResponseTime: '2.3 min',
  conversionRate: '12.4%',
  activeUsers: 185,
};

interface TimeRangeOption {
  label: string;
  value: string;
}

const TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
  { label: 'This Year', value: 'year' },
];

const StatisticsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('30d');
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Mock state data that would come from API
  const [monthlyData, setMonthlyData] = useState(MOCK_MONTHLY_DATA);
  const [topProducts, setTopProducts] = useState(MOCK_TOP_PRODUCTS);
  const [engagementStats, setEngagementStats] = useState(MOCK_ENGAGEMENT_STATS);
  
  // Simulate API data loading
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // In a real app, these would be API calls to get real data
        setMonthlyData(MOCK_MONTHLY_DATA);
        setTopProducts(MOCK_TOP_PRODUCTS);
        setEngagementStats(MOCK_ENGAGEMENT_STATS);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, [selectedTimeRange]);
  
  // Calculate overall stats from monthly data
  const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const totalOrders = monthlyData.reduce((sum, month) => sum + month.orders, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Render time range selector
  const renderTimeRangeSelector = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.timeRangeContainer}
    >
      {TIME_RANGE_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.timeRangeOption,
            selectedTimeRange === option.value && styles.selectedTimeRange,
          ]}
          onPress={() => setSelectedTimeRange(option.value)}
        >
          <Text
            style={[
              styles.timeRangeText,
              selectedTimeRange === option.value && styles.selectedTimeRangeText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
  
  // Render tabs for different stat categories
  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
        onPress={() => setActiveTab('overview')}
      >
        <Text
          style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}
        >
          Overview
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'products' && styles.activeTab]}
        onPress={() => setActiveTab('products')}
      >
        <Text
          style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}
        >
          Products
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'engagement' && styles.activeTab]}
        onPress={() => setActiveTab('engagement')}
      >
        <Text
          style={[styles.tabText, activeTab === 'engagement' && styles.activeTabText]}
        >
          Engagement
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  // Render overview tab content
  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalRevenue.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalOrders}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${averageOrderValue.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Avg. Order Value</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{engagementStats.conversionRate}</Text>
          <Text style={styles.statLabel}>Conversion Rate</Text>
        </View>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Monthly Performance</Text>
      </View>
      
      <View style={styles.chartPlaceholder}>
        <Icon name="bar-chart" size={40} color="#999" />
        <Text style={styles.chartPlaceholderText}>
          Monthly revenue chart would appear here
        </Text>
      </View>
      
      <View style={styles.monthlySummary}>
        {monthlyData.map((month, index) => (
          <View key={index} style={styles.monthItem}>
            <Text style={styles.monthName}>{month.month}</Text>
            <Text style={styles.monthRevenue}>${month.revenue}</Text>
            <Text style={styles.monthOrders}>{month.orders} orders</Text>
          </View>
        ))}
      </View>
    </View>
  );
  
  // Render products tab content
  const renderProductsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Selling Products</Text>
      </View>
      
      {topProducts.map((product, index) => (
        <View key={product.id} style={styles.productItem}>
          <View style={styles.productRank}>
            <Text style={styles.rankText}>{index + 1}</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productSales}>{product.sales} sold</Text>
          </View>
          <Text style={styles.productRevenue}>${product.revenue}</Text>
        </View>
      ))}
    </View>
  );
  
  // Render engagement tab content
  const renderEngagementTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsGrid}>
        <View style={styles.engagementCard}>
          <Icon name="chat" size={24} color="#0066cc" style={styles.engagementIcon} />
          <Text style={styles.engagementValue}>{engagementStats.totalChats}</Text>
          <Text style={styles.engagementLabel}>Total Chats</Text>
        </View>
        
        <View style={styles.engagementCard}>
          <Icon name="schedule" size={24} color="#4caf50" style={styles.engagementIcon} />
          <Text style={styles.engagementValue}>{engagementStats.avgResponseTime}</Text>
          <Text style={styles.engagementLabel}>Avg Response Time</Text>
        </View>
        
        <View style={styles.engagementCard}>
          <Icon name="trending-up" size={24} color="#ff9800" style={styles.engagementIcon} />
          <Text style={styles.engagementValue}>{engagementStats.conversionRate}</Text>
          <Text style={styles.engagementLabel}>Conversion Rate</Text>
        </View>
        
        <View style={styles.engagementCard}>
          <Icon name="people" size={24} color="#9c27b0" style={styles.engagementIcon} />
          <Text style={styles.engagementValue}>{engagementStats.activeUsers}</Text>
          <Text style={styles.engagementLabel}>Active Users</Text>
        </View>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Engagement Overview</Text>
      </View>
      
      <View style={styles.chartPlaceholder}>
        <Icon name="trending-up" size={40} color="#999" />
        <Text style={styles.chartPlaceholderText}>
          Engagement metrics chart would appear here
        </Text>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics & Insights</Text>
      </View>
      
      {renderTimeRangeSelector()}
      {renderTabs()}
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading statistics...</Text>
        </View>
      ) : (
        <ScrollView style={styles.contentContainer}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'engagement' && renderEngagementTab()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  timeRangeContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeRangeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  selectedTimeRange: {
    backgroundColor: '#0066cc',
  },
  timeRangeText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTimeRangeText: {
    color: '#fff',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0066cc',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#0066cc',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  chartPlaceholderText: {
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },
  monthlySummary: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  monthItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  monthName: {
    width: '20%',
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  monthRevenue: {
    width: '40%',
    fontSize: 14,
    color: '#0066cc',
    fontWeight: '500',
  },
  monthOrders: {
    width: '40%',
    fontSize: 14,
    color: '#666',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  productRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontWeight: 'bold',
    color: '#333',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productSales: {
    fontSize: 14,
    color: '#666',
  },
  productRevenue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  engagementCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  engagementIcon: {
    marginBottom: 12,
  },
  engagementValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  engagementLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default StatisticsScreen;