import { CompoundOption } from "@/components/common/CompoundOption";
import { alerts } from "@/constants";
import useMutateDeletePost from "@/hooks/queries/useMutateDeletePost";
import { FeedStackParamList } from "@/navigations/stack/FeedStackNavigator";
import { useDetailPostStore } from "@/store/usePostStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Alert } from "react-native";

interface FeedDetailOptionProps {
    isVisible: boolean;
    hideOption: () => void;
}

function FeedDetailOption({isVisible, hideOption}: FeedDetailOptionProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const deletePost = useMutateDeletePost();
  const { detailPost } = useDetailPostStore();
  const handleDeletePost = () => {
    if(!detailPost){return;}

    Alert.alert(alerts.DELETE_POST.TITLE,alerts.DELETE_POST.DESCRIPTION, [
      {
        text: '취소',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: () => {
          deletePost.mutate(detailPost.id, {
            onSuccess: () => {
              hideOption();
              navigation.goBack();
            },
          });
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
        <CompoundOption.Container>
            <CompoundOption.Button isDanger onPress={handleDeletePost}>
              삭제하기
            </CompoundOption.Button>
            <CompoundOption.Divider />
            <CompoundOption.Button>
              수정하기
            </CompoundOption.Button>
        </CompoundOption.Container>
        <CompoundOption.Container>
            <CompoundOption.Button onPress={hideOption}>
              취소
            </CompoundOption.Button>
        </CompoundOption.Container>
    </CompoundOption>
  );
}

export default FeedDetailOption;