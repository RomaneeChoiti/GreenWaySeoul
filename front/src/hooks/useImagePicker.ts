import getFormDataImages from '@/utils/image';
import ImagePicker from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';
import { useState } from 'react';
import { ImageUri } from '@/types/domain';

interface UseImagePickerProps{
    initialImages: ImageUri[];
}

function useImagePicker({initialImages = []}: UseImagePickerProps) {
    const [imageUris, setImageUris] = useState(initialImages);
    const uploadImages = useMutateImages();

    const addImageUris = (uris: string[]) => {
        setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
    };

    const handleChange = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            multiple: true,
            includeBase64: true,
            maxFiles: 5,
            cropperChooseText: '완료',
            cropperCancelText: '취소',
        }).then(images => {
            const formData = getFormDataImages(images);
            uploadImages.mutate(formData, {
                onSuccess: data => {
                    console.log('Mutation Success:', data); // 성공적으로 호출된 데이터 확인
                    addImageUris(data);
                },
                onError: error => {
                    console.log('Mutation Error:', error); // 에러 발생 시 출력
                },
            });
        })
        .catch(error => {
            // 이미지를 선택을 안해도 에러가 발생한다. 그렇게에 예외 처리
            if(error.code !== 'E_PICKER_CANCELLED') {
                // Handle error
            }
            console.log('ImagePicker Error: ', error);
        });
    };
    return { imageUris, handleChange };
}

export default useImagePicker;