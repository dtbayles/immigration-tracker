import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface AddCaseModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onAddCase: (caseNumber: string) => void;
}

const AddCaseModal: React.FC<AddCaseModalProps> = ({ modalVisible, setModalVisible, onAddCase }) => {
  const [caseNumberInput, setCaseNumberInput] = useState('');

  const addCase = () => {
    onAddCase(caseNumberInput);
    setCaseNumberInput('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.titleText}>Add USCIS Case</Text>
          <TextInput
            placeholder="Enter Case Number"
            placeholderTextColor="grey"
            style={styles.textInput}
            value={caseNumberInput}
            onChangeText={setCaseNumberInput}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={addCase}>
                <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '75%',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: { 
    borderColor: 'grey', 
    borderBottomWidth: 1, 
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: '33%',
  },
});

export default AddCaseModal;
