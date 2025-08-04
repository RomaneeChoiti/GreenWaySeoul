import React, { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Dimensions, Alert } from 'react-native';
import { TextInput } from 'react-native';
import useForm from '@/hooks/useForm';
import { validateAddPost } from '@/utils';
import { colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
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
import LinearGradient from 'react-native-linear-gradient';
import PloggingInfoCard from '@/components/post/PloggingInfoCard';
import CO2ReductionCard from '@/components/post/CO2ReductionCard';
import PostInputForm from '@/components/post/PostInputForm';
import ActionButtons from '@/components/post/ActionButtons';
import usePloggingCalculator from '@/hooks/usePloggingCalculator';
import ConfirmationModal from '@/components/common/ConfirmationModal';


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

  // zustand Store
  const { address: trashcanAddress, location: place, latitude, longitude } = useTrashcanStore();
  const { ploggingTime } = usePloggingStateStore();
  const formattedTime = ploggingTime
    ? new Date(ploggingTime).toISOString().substr(11, 8) // Format as HH:mm:ss
    : '00:00:00';

  // PloggingCalculator 훅 사용
  const { ploggingMinutes, co2Reduction, treeEquivalent } = usePloggingCalculator(ploggingTime);

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
  // 제목 검증
  if (!addPost.values.title.trim()) {
    // 제목 필드에 에러 표시를 위해 터치된 상태로 만들기
    addPost.setFieldTouched('title', true);
    
    // 사용자에게 알림 표시
    Alert.alert(
      '제목을 입력해주세요',
      '게시글 제목은 필수 항목입니다.',
      [{ text: '확인', style: 'default' }],
    );
    return;
  }
  
  const body = {
    date: formattedDate,
    title: addPost.values.title,
    description: addPost.values.description,
    color: 'red', // 명시적으로 일단 값을 줌
    score: treeEquivalent, // 나무 그루 수를 점수로 사용
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

  return (
    <LinearGradient
          colors={['#E1E1E1', '#ffffff']}
          locations={[0.9, 0]}
          style={styles.gradient}
    >
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <PloggingInfoCard
            date={formattedDate}
            day={day}
            time={formattedTime}
            address={trashcanAddress || '주소 없음'}
            place={place || '위치 없음'}
            theme={theme}
          />
          <CO2ReductionCard
            ploggingMinutes={ploggingMinutes}
            co2Reduction={co2Reduction}
            treeEquivalent={treeEquivalent}
            theme={theme}
          />
          <PostInputForm
            ref={descriptionRef}
            title={addPost.values.title}
            description={addPost.values.description}
            titleError={addPost.errors.title}
            descriptionError={addPost.errors.description}
            titleTouched={addPost.touched.title}
            descriptionTouched={addPost.touched.description}
            onTitleChange={addPost.getTextInputProps('title').onChangeText}
            onDescriptionChange={addPost.getTextInputProps('description').onChangeText}
            onTitleSubmit={() => descriptionRef.current?.focus()}
            theme={theme}
          />
          {/* TODO: 임시로 숨김 처리 */}
          <View style={[styles.imagesViewer, styles.hiddenTemp]}>
            <ImageInput onChange={imagePicker.handleChange}/>
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              showOptions
            />
          </View>
          <StarRating treeCount={treeEquivalent} />
          <ActionButtons
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            theme={theme}
          />
        </View>
      </ScrollView>
      <ConfirmationModal
        visible={isModalVisible}
        message="저장하지 않고 나가시겠습니까?"
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
      />
    </SafeAreaView>
    </LinearGradient>
  );
}

const styling = (theme:ThemeMode) =>
  StyleSheet.create({
  white:{
    color: colors[theme].UNCHANGE_WHITE,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  flexRow:{
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    padding: Dimensions.get('screen').height * 0.02,
    gap: Dimensions.get('screen').height * 0.009,
  },
  inputContainer: {
    gap: 20,
    margin: Dimensions.get('screen').height * 0.02,
  },
  fieldBox:{
    backgroundColor: colors[theme].WHITE,
    padding: Dimensions.get('screen').height * 0.025,
    borderRadius: 20,
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
  // TODO: 임시로 숨김 처리
  hiddenTemp: {
    display: 'none',
  },
});

export default AddPostScreen;
