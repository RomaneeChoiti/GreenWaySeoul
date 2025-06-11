import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import ImageInput from '@/components/post/ImageInput';
import PreviewImageList from '@/components/common/PreviewImageList';
import useImagePicker from '@/hooks/useImagePicker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';
import { feedNavigations } from '@/constants/navigations';

type EditPostScreenRouteProp = RouteProp<
    FeedStackParamList,
    typeof feedNavigations.EDIT_POST
>;


function EditPostScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<EditPostScreenRouteProp>();
  const { post } = params;

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const imagePicker = useImagePicker({ initialImages: post.images });
  const updatePost = useMutateUpdatePost();

  const handleUpdate = () => {
    const updatedPost = {
      ...post,
      title,
      description,
      imageUris: imagePicker.imageUris,
    };

    updatePost.mutate(updatedPost, {
      onSuccess: () => {
        navigation.goBack();
      },
      onError: () => {
        console.error('Error updating post:');
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="제목을 입력하세요."
            value={title}
            onChangeText={setTitle}
          />
          <InputField
            placeholder="내용을 입력하세요."
            value={description}
            onChangeText={setDescription}
            multiline
          />
          {/* TODO: 이미지 업데이트 끝나면 해당 hiddenTemp 삭제 */}
          <View style={[styles.imagesViewer, styles.hiddenTemp]}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              showOptions
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              label="취소"
              variant="outlined"
              size="medium"
              onPress={() => navigation.goBack()}
            />
            <CustomButton
              label="저장"
              variant="filled"
              size="medium"
              onPress={handleUpdate}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    gap: 20,
    margin: 20,
  },
  imagesViewer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  hiddenTemp:{
    display: 'none',
  },
});

export default EditPostScreen;
