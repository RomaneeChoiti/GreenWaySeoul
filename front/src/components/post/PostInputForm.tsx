import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import InputField from '@/components/common/InputField';
import { colors } from '@/constants';
import { ThemeMode } from '@/types';

interface PostInputFormProps {
  title: string;
  description: string;
  titleError?: string;
  descriptionError?: string;
  titleTouched?: boolean;
  descriptionTouched?: boolean;
  onTitleChange: (text: string) => void;
  onDescriptionChange: (text: string) => void;
  onTitleSubmit: () => void;
  theme: ThemeMode;
}

const PostInputForm = forwardRef<TextInput, PostInputFormProps>(({
  title,
  description,
  titleError,
  descriptionError,
  titleTouched,
  descriptionTouched,
  onTitleChange,
  onDescriptionChange,
  onTitleSubmit,
  theme,
}, descriptionRef) => {
  const styles = styling(theme);

  return (
    <View style={[styles.inputFieldContainer, styles.fieldBox]}>
      <Text style={styles.inputIntroText}>
        오늘을 남겨보세요.{'\n'}당신의 기록이 모여 숲을 만듭니다.
      </Text>
      <InputField
        placeholder="제목을 입력하세요. (필수)"
        value={title}
        onChangeText={onTitleChange}
        error={titleError}
        touched={titleTouched}
        returnKeyType="next"
        submitBehavior="blurAndSubmit"
        onSubmitEditing={onTitleSubmit}
      />
      <InputField
        ref={descriptionRef}
        placeholder="오늘의 플로깅 기록을 입력하세요. (선택)"
        value={description}
        onChangeText={onDescriptionChange}
        error={descriptionError}
        touched={descriptionTouched}
        multiline
        returnKeyType="next"
      />
    </View>
  );
});

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    fieldBox: {
      backgroundColor: colors[theme].WHITE,
      padding: Dimensions.get('screen').height * 0.025,
      borderRadius: 20,
    },
    inputFieldContainer: {
      gap: Dimensions.get('screen').height * 0.01,
    },
    inputIntroText: {
      fontSize: 12,
      color: colors[theme].BLACK,
    },
  });

PostInputForm.displayName = 'PostInputForm';

export default PostInputForm;
