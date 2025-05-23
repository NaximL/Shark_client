
import React from 'react';
import { Modal, View, StyleSheet, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native';

type FullScreenModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function FullScreenModal({ visible, onClose, children }: FullScreenModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {children}
          </ScrollView>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Закрити</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '90%',
    minHeight: 0,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 20,
    gap: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  closeButton: {
    
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#175384',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
});