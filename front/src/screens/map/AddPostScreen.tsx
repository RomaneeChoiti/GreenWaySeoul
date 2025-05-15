import React, { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import InputField from '@/components/common/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native';
import useForm from '@/hooks/useForm';
import { validateAddPost } from '@/utils';
import { colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '@/components/common/CustomButton';
import ModalComponent from '@/components/common/ModalComponent';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import { useTrashcanStore } from '@/store/useTrashcanStore';
import { usePloggingStateStore } from '@/store/usePloggingStore';
import StarRating from '@/components/post/StarRating';
import ImageInput from '@/components/post/ImageInput';
import usePermission from '@/hooks/usePermission';
import useImagePicker from '@/hooks/useImagePicker';
import PreviewImageList from '@/components/common/PreviewImageList';
import { formatDate } from '@/utils/date';
import { ThemeMode } from '@/types';
import { useThemeStore } from '@/store/useThemeStore';


function AddPostScreen() {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate); // Format as yyyy-mm-dd
  const day = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(currentDate);
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const imagePicker = useImagePicker({ initialImages: [] });
  usePermission('PHOTO');

  /*
    TODO: 이동 거리는 후순위로
    const [distance, setDistance] = useState('0km');

  */
  const [score, setScore] = useState(0);

  // zustand Store
  const { address: trashcanAddress, location: place, latitude, longitude } = useTrashcanStore();
  const { ploggingTime } = usePloggingStateStore();
  const formattedTime = ploggingTime
    ? new Date(ploggingTime).toISOString().substr(11, 8) // Format as HH:mm:ss
    : '00:00:00';

  const addPost = useForm({
      initialValues: { title: '', description: '' },
      validate: validateAddPost,
    });

  // handler
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
// 임시로 타입을 변경
// 임시 타입
const handleSubmit = () => {
  const body = {
    date: formattedDate,
    title: addPost.values.title,
    description: addPost.values.description,
    color: 'red', // 명시적으로 일단 값을 줌
    score,
    address: trashcanAddress || '주소 없음',
    latitude: latitude || 0, // Provide default value if latitude is undefined
    longitude: longitude || 0, // Provide default value if longitude is undefined
    // place: place || '위치 없음',
    // distance: distance,
    // time: formattedTime,
    imageUris: imagePicker.imageUris,
  };
  createPost.mutate({...body}, {
    onSuccess: () => {
      navigation.goBack();
    },
    onError: (error) => {
      console.error('Error creating post:', error);
    },
  });
};

// 원래 타입
// const handleSubmit = () => {
//   const body = {
//     date: formattedDate,
//     address: trashcanAddress || '주소 없음',
//     place: place || '위치 없음',
//     // distance: distance,
//     time: formattedTime,
//     title: addPost.values.title,
//     description: addPost.values.description,
//     score,
//     imageUris: [],
//   };
//   createPost.mutate({...body}, {
//     onSuccess: () => {
//       navigation.goBack();
//     },
//     onError: (error) => {
//       console.error('Error creating post:', error);
//     },
//   });
// };

  const handleStarPress = (rating: number) => {
    setScore(rating); // Update the score when a star is clicked
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.addressContainer}>
            <MaterialIcons name="location-on" size={25} color={'white'}/>
            <View>
              <Text style={styles.addressText}>{trashcanAddress || '주소 없음'}</Text>
              <Text style={styles.addressText}>{place || '위치 없음'}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{formattedDate} ( {day} )</Text>
            {/* TODO: 맵화면에 폴로깅 진행시간 check */}
            <Text style={styles.infoText}>{formattedTime}</Text>
          </View>
            {/* <Text>이동 거리 : {distance}</Text> */}
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
          <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.handleChange}/>
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              showOptions
            />
          </View>

          <StarRating score={score} onRate={handleStarPress} />
          <View style={styles.buttonContainer}>
            <CustomButton label="취소" variant="outlined" size="medium" onPress={handleCancel} />
            <CustomButton label="등록" variant="filled" size="medium" onPress={handleSubmit} />
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

const styling = (theme:ThemeMode) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].WHITE,
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
  addressContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  addressText:{
    fontSize: 18,
    color: colors[theme].UNCHANGE_WHITE,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  infoContainer: {
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  infoText:{
    fontSize: 25,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  imagesViewer: {
    flexDirection: 'row',
    gap: 10,

  },
});

export default AddPostScreen;
