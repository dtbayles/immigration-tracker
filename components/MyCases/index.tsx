import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import AddCaseModal from './AddCaseModal'; // Import the AddCaseModal component
import { useTheme } from '@react-navigation/native';
import { Animated } from 'react-native';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';

const MyCases = () => {
  const { colors } = useTheme();
  const styles = componentStyles(colors);
  const [cases, setCases] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>(''); // State for last refreshed date

  const addCase = (caseNumber: string) => {
    if (caseNumber.trim() !== '') {
      setCases([...cases, caseNumber.trim()]);
    }
    setModalVisible(false);
  };

  const renderCaseItem = ({ item }: { item: string }) => {
    const onDelete = () => {
      // Implement the delete logic here
      const updatedCases = cases.filter((caseNumber) => caseNumber !== item);
      setCases(updatedCases);
    };
  
    return (
      <AppleStyleSwipeableRow onDelete={onDelete}>
        <View style={styles.caseItem}>
          <Text style={styles.caseText}>Case Number: {item}</Text>
        </View>
      </AppleStyleSwipeableRow>
    );
  };

  const handleRefresh = () => {
    // Implement your refresh logic here if needed
    // For example, you might fetch updated cases from a server

    // Get the current date and time and update the lastRefreshed state
    const currentDate = new Date();
    setLastRefreshed(currentDate.toLocaleString());
  };

  // Header component to display "Last refreshed at DATE"
  const ListHeaderComponent = () => (
    <View style={styles.headerContainer}>
      {lastRefreshed !== '' && (
        <Text style={styles.lastRefreshedText}>Last refreshed at {lastRefreshed}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* List of stored USCIS cases */}
      {cases.length > 0 ? (
        <FlatList
        data={cases}
        renderItem={renderCaseItem}
        keyExtractor={(item) => item}
        refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
        ListHeaderComponent={ListHeaderComponent} // Set the ListHeaderComponent
        />
      ) : (
        <View style={styles.noCasesContainer}>
          <Text style={styles.noCasesText}>No cases added</Text>
        </View>
      )}


      {/* Plus button to open the modal */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Modal for adding a new USCIS case */}
      <AddCaseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAddCase={addCase}
      />
    </View>
  );
};

const componentStyles = (colors) => StyleSheet.create({
  container: { 
    flex: 1,
  },
  caseItem: {
    padding: 10,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    height: 80,
    marginHorizontal: 20,
    marginBottom: 10, 
    borderRadius: 8,
  },
  caseText: {
    fontSize: 18,
    color: colors.text,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#007bff',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCasesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCasesText: {
    fontSize: 18,
    color: colors.text,
    alignSelf: 'center',
    marginTop: '50%',
    marginBottom: '50%',
  },
  headerContainer: {
    marginBottom: 10,
  },
  lastRefreshedText: {
    fontSize: 14,
    color: colors.text,
    alignSelf: 'center',
  },
});

export default MyCases;
