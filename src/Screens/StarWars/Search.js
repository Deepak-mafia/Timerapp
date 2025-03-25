import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const INITIAL_URL = 'https://swapi.dev/api/planets/?format=json';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(INITIAL_URL);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const timeout = useRef(null);

  const fetchPlanets = async (url, append = false) => {
    if (!url) return;
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (append) {
        setPlanets(prev => [...data.results, ...prev]);
      } else {
        setPlanets(data.results);
      }
      setNextPage(data.next);
    } catch (error) {
      console.error('Error fetching planets: ', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      let url = '';
      if (query.trim() === '') {
        url = INITIAL_URL;
      } else {
        url = `https://swapi.dev/api/planets/?search=${query.trim()}&format=json`;
      }
      fetchPlanets(url, false);
    }, 300);

    return () => clearTimeout(timeout.current);
  }, [query]);

  const handleRefresh = () => {
    if (nextPage) {
      setRefreshing(true);
      fetchPlanets(nextPage, true);
    }
  };

  const getContainerHeight = population => {
    if (population && population !== 'unknown') {
      const popNum = parseInt(population, 10);
      if (!isNaN(popNum) && popNum > 0) {
        // Base height is 80, and we add an offset based on logarithm of population
        return 80 + Math.log10(popNum) * 20;
      }
    }
    return 80;
  };

  const renderItem = ({item}) => {
    const height = getContainerHeight(item.population);
    return (
      <View style={[styles.itemContainer, {height}]}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.subText}>Population: {item.population}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for planets..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
      />
      {isLoading && !refreshing && (
        <ActivityIndicator
          size="large"
          color="#FFD700"
          style={{marginVertical: 10}}
        />
      )}
      <FlatList
        data={planets}
        keyExtractor={(item, index) => item.url || index.toString()}
        renderItem={renderItem}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          !isLoading && <Text style={styles.noResults}>No results found.</Text>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  searchInput: {
    height: 50,
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#333',
    width: '100%',
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  itemText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  noResults: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
