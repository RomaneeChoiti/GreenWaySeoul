
const alerts = {
    LOCATION_PERMISSION: {
        TITLE : '위치 권한 허용이 필요합니다.',
        DESCRIPTION : '설정 화면에서 위치 권한을 허용해주세요.',
    },
    PHOTO_PERMISSION: {
        TITLE : '사진 권한 허용이 필요합니다.',
        DESCRIPTION : '설정 화면에서 사진 권한을 허용해주세요.',
    },
    DELETE_POST: {
        TITLE : '게시물 삭제',
        DESCRIPTION : '정말로 게시물을 삭제하시겠습니까?',
        ERROR_TITLE : '게시물 삭제 실패',
        ERROR_DESCRIPTION : '게시물 삭제에 실패했습니다. 다시 시도해주세요.',
    },
    BOOKMARK_POST_ERROR: {
        TITLE : '오류',
        DESCRIPTION : '북마크 상태를 변경할 수 없습니다. 다시 시도해주세요',
    },
} as const;



export { alerts };