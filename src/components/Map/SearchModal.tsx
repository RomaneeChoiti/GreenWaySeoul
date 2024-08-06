import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Modal,
  Dimensions,
} from 'react-native'

interface SearchModalProps {
  isVisible: boolean
  message: string
  onRequestClose: () => void
  trashCanData: any[]
}

const SearchModal: React.FC<SearchModalProps> = ({
  isVisible,
  message,
  onRequestClose,
  trashCanData,
}) => {
  const animatedStyle = {
    shadowColor: message === 'Searching...' ? '#B989FF' : '#379FDA',
  }

  const isSearchComplete = trashCanData.length > 0

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={[styles.container, animatedStyle, styles.modalContent]}>
        <Image
          style={styles.searchIcon}
          source={require('../../../assets/magnifier.png')}
        />
        <Text style={styles.text}>
          {isSearchComplete ? 'Nearby trash can search complete.' : message}
        </Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    alignSelf: 'center',
    marginBottom: Dimensions.get('window').height * 0.05,
  },
  container: {
    marginTop: Dimensions.get('window').height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '85%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 4,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  text: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: '#232323',
  },
})

export default SearchModal
