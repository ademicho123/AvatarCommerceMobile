import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import apiClient from '../../api/apiClient';

interface RevenueData {
  total: number;
  lastMonth: number;
  percentChange: number;
}

interface InfluencerStatus {
  hasAvatar: boolean;
  avatarId?: string;
  pendingChats: number;
}

const DashboardScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [isLoading, setIsLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<RevenueData>({
    total: 0,
    lastMonth: 0,
    percentChange: 0,
  });
  const [influencerStatus, setInfluencerStatus] = useState<InfluencerStatus>({
    hasAvatar: false,
    pendingChats: 0,
  });
  const [recentSales, setRecentSales] = useState<any[]>([]);
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with actual API calls to your backend
      // For now, using mock data for demonstration
      
      // Mock influencer status data
      const statusMockData = {
        hasAvatar: Math.random() > 0.5,
        avatarId: Math.random() > 0.5 ? 'avatar_' + Math.floor(Math.random() * 1000) : undefined,
        pendingChats: Math.floor(Math.random() * 10),
      };
      
      // Mock revenue data
      const lastMonth = Math.floor(Math.random() * 5000);
      const total = Math.floor(Math.random() * 10000) + 5000;
      const prevMonth = lastMonth * (Math.random() > 0.5 ? 0.9 : 1.1);
      const percentChange = ((lastMonth - prevMonth) / prevMonth) * 100;
      
      // Mock recent sales
      const mockSales = Array(5).fill(0).map((_, index) => ({
        id: 'sale_' + (index + 1),
        productName: 'Product ' + (index + 1),
        customer: 'Customer ' + (index + 1),
        amount: Math.floor(Math.random() * 100) + 20,
        date: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString(),
      }));
      
      // Update state with mock data
      setInfluencerStatus(statusMockData);
      setRevenueData({
        total,
        lastMonth,
        percentChange,
      });
      setRecentSales(mockSales);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={fetchDashboardData}
          colors={['#0066cc']}
        />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            Welcome back,
          </Text>
          <Text style={styles.nameText}>
            {user?.name || 'Influencer'}
          </Text>
        </View>
        
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/placeholder.png')}
            style={styles.avatar}
          />
          <View style={styles.avatarStatus}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: influencerStatus.hasAvatar ? '#4caf50' : '#f44336' },
              ]}
            />
          </View>
        </View>
      </View>
      
      {!influencerStatus.hasAvatar && (
        <TouchableOpacity
          style={styles.setupCard}
          onPress={() => navigation.navigate('CreateAvatar' as never)}
        >
          <View style={styles.setupIconContainer}>
            <Icon name="person-add" size={24} color="#fff" />
          </View>
          <View style={styles.setupContent}>
            <Text style={styles.setupTitle}>Create Your Avatar</Text>
            <Text style={styles.setupDesc}>
              Set up your digital twin to start recommending products
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color="#0066cc" />
        </TouchableOpacity>
      )}
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            ${revenueData.total.toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            ${revenueData.lastMonth.toLocaleString()}
          </Text>
          <View style={styles.statChangeContainer}>
            <Text style={styles.statLabel}>Last Month</Text>
            <View style={styles.changeIndicator}>
              <Icon
                name={revenueData.percentChange >= 0 ? 'arrow-upward' : 'arrow-downward'}
                size={12}
                color={revenueData.percentChange >= 0 ? '#4caf50' : '#f44336'}
              />
              <Text
                style={[
                  styles.percentChange,
                  { color: revenueData.percentChange >= 0 ? '#4caf50' : '#f44336' },
                ]}
              >
                {Math.abs(revenueData.percentChange).toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {influencerStatus.pendingChats}
          </Text>
          <Text style={styles.statLabel}>Pending Chats</Text>
        </View>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Sales</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Statistics' as never)}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {recentSales.length > 0 ? (
        <View style={styles.salesContainer}>
          {recentSales.map((sale) => (
            <View key={sale.id} style={styles.saleItem}>
              <View style={styles.saleInfo}>
                <Text style={styles.productName}>{sale.productName}</Text>
                <Text style={styles.customerName}>{sale.customer}</Text>
                <Text style={styles.saleDate}>
                  {new Date(sale.date).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.saleAmount}>${sale.amount}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="shopping-cart" size={40} color="#ccc" />
          <Text style={styles.emptyStateText}>No sales yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Once you start recommending products, your sales will appear here.
          </Text>
        </View>
      )}
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
      </View>
      
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity
          style={styles.quickActionItem}
          onPress={() => navigation.navigate('CreateAvatar' as never)}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: '#e1f5fe' }]}>
            <Icon name="face" size={24} color="#0066cc" />
          </View>
          <Text style={styles.quickActionText}>Update Avatar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.quickActionItem}
          onPress={() => {/* Navigate to products screen */}}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: '#e8f5e9' }]}>
            <Icon name="shopping-bag" size={24} color="#4caf50" />
          </View>
          <Text style={styles.quickActionText}>Products</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.quickActionItem}
          onPress={() => navigation.navigate('Statistics' as never)}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: '#fff3e0' }]}>
            <Icon name="bar-chart" size={24} color="#ff9800" />
          </View>
          <Text style={styles.quickActionText}>Analytics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.quickActionItem}
          onPress={() => navigation.navigate('Settings' as never)}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: '#f3e5f5' }]}>
            <Icon name="settings" size={24} color="#9c27b0" />
          </View>
          <Text style={styles.quickActionText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  setupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  setupIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  setupContent: {
    flex: 1,
  },
  setupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  setupDesc: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statChangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentChange: {
    fontSize: 10,
    marginLeft: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#0066cc',
  },
  salesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  saleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  saleInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  customerName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  saleDate: {
    fontSize: 10,
    color: '#999',
  },
  saleAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 24,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  quickActionItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
  },
});