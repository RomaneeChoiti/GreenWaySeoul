import React, { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import InputField from '@/components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native';
import useForm from '@/hooks/useForm';
import { validateAddPost } from '@/utils';
import { colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '@/components/CustomButton';
import ModalComponent from '@/components/ModalComponent';

interface AddPostScreenProps {}

function AddPostScreen({}: AddPostScreenProps) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const currentDate = new Date().toISOString();
  const formattedDate = new Intl.DateTimeFormat('en-CA').format(new Date(currentDate));
  const descriptionRef = useRef<TextInput | null>(null);
  const addPost = useForm({
      initialValues: { title: '', description: '' },
      validate: validateAddPost,
    });

  const handleCancel = () => {
    setModalVisible(true); // Show the modal
  };

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.goBack(); // Navigate back to the map screen
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={25} color={'white'}/>
            <Text style={styles.locationText}>삼성동 505-2</Text>
          </View>
          <Text>날짜: {formattedDate}</Text>
          {/* TODO: 맵화면에 폴로깅 진행시간 check */}
          <Text>소요 시간 : 00:00:00</Text>
          <Text>이동 거리 : 3km</Text>
          <InputField
            placeholder="제목을 입력하세요."
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            submitBehavior="blurAndSubmit"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
              ref={descriptionRef}
              placeholder="오늘의 플로깅 기록을 입력하세요. (선택)"
              error={addPost.errors.description}
              touched={addPost.touched.description}
              multiline
              returnKeyType ="next"
              {...addPost.getTextInputProps('description')}
          />
          <View style={styles.buttonContainer}>
            <CustomButton label="취소" variant="outlined" size="medium" onPress={handleCancel} />
            <CustomButton label="등록" variant="filled" size="medium" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>
      <ModalComponent
        visible={isModalVisible}
        message="저장하지 않고 나가시겠습니까?"
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    margin: 20,
  },
  inputContainer: {
    gap: 20,
    margin: 20,
  },
  locationContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  locationText:{
    fontSize: 18,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default AddPostScreen;