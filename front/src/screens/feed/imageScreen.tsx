import ImageCarousel from "@/components/common/ImageCarousel";
import { feedNavigations } from "@/constants";
import { FeedStackParamList } from "@/navigations/stack/FeedStackNavigator";
import { useDetailPostStore } from "@/store/usePostStore";
import { StackScreenProps } from "@react-navigation/stack";

type ImageScreenProps = StackScreenProps<
    FeedStackParamList,
    typeof feedNavigations.IMAGE_SCREEN
>;


function ImageScreen({route}: ImageScreenProps) {
    const { index } = route.params;
    const { detailPost } = useDetailPostStore();

  return (
    <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index}/>
  );
}


export default ImageScreen;