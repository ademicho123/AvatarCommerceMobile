import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ProductItem from '../../components/ProductItem';

// Mock product data for demonstration
const MOCK_PRODUCTS = [
  {
    id: '1',
    title: 'Wireless Noise Cancelling Headphones',
    price: '$249.99',
    url: 'https://example.com/product1',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'electronics',
  },
  {
    id: '2',
    title: 'Fitness Smartwatch with Heart Rate Monitor',
    price: '$199.99',
    url: 'https://example.com/product2',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'wearables',
  },
  {
    id: '3',
    title: 'Ultra Slim Laptop Stand',
    price: '$39.99',
    url: 'https://example.com/product3',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'accessories',
  },
  {
    id: '4',
    title: 'Portable Bluetooth Speaker',
    price: '$79.99',
    url: 'https://example.com/product4',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'electronics',
  },
  {
    id: '5',
    title: 'Ergonomic Mechanical Keyboard',
    price: '$129.99',
    url: 'https://example.com/product5',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'accessories',
  },
  {
    id: '6',
    title: 'Fast Charging Power Bank 20000mAh',
    price: '$49.99',
    url: 'https://example.com/product6',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'accessories',
  },
];

// Define product categories
const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'wearables', name: 'Wearables' },
  { id: 'accessories', name: 'Accessories' },
];

const ProductsScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter products by search query and category
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let filtered = [...products];
      
      // Apply search filter
      if (searchQuery.trim()) {
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => 
          product.category === selectedCategory
        );
      }
      
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, selectedCategory, products]);
  
  // Render category tabs
  const renderCategoryTabs = () => (
    <View style={styles.categoriesContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScrollContent}
      >
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.selectedCategoryTab,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Icon name="close" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate('Chat' as never)}
        >
          <Icon name="chat" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Render category tabs */}
      {renderCategoryTabs()}
      
      {/* Product list */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
        </View>
      ) : filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ProductItem
              title={item.title}
              price={item.price}
              url={item.url}
              imageUrl={item.imageUrl}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="search-off" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubtext}>
            Try adjusting your search or filter criteria
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  chatButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0066cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoriesScrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
  },
  selectedCategoryTab: {
    backgroundColor: '#0066cc',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProductsScreen;