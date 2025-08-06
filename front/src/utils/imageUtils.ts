export const successImages = [
    require('../assets/natureImgs/1.png'),
    require('../assets/natureImgs/2.png'),
    require('../assets/natureImgs/3.png'),
    require('../assets/natureImgs/4.png'),
    require('../assets/natureImgs/5.png'),
    require('../assets/natureImgs/6.png'),
    require('../assets/natureImgs/7.png'),
];

/**
 * 게시물 ID를 기반으로 이미지를 선택합니다.
 * @param postId - 게시물 ID
 * @returns 선택된 이미지
 */
export const getImageByPostId = (postId: number) => {
    const imageIndex = postId % successImages.length;
    return successImages[imageIndex];
};

/**
 * 캐로셀용으로 연속된 3개의 이미지를 반환합니다.
 * @param postId - 게시물 ID
 * @returns 3개의 연속된 이미지 배열
 */
export const getCarouselImages = (postId: number) => {
    const startIndex = postId % successImages.length;
    return [
        successImages[startIndex],
        successImages[(startIndex + 1) % successImages.length],
        successImages[(startIndex + 2) % successImages.length],
    ];
};
