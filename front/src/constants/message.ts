
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
    DELETE_ACCOUNT: {
        TITLE : '회원탈퇴',
        DESCRIPTION : '회원 탈퇴 시 회원 정보는 삭제되며 복구할 수 없습니다.',
        ERROR_TITLE : '회원탈퇴 실패',
        ERROR_DESCRIPTION : '회원탈퇴에 실패했습니다. 다시 시도해주세요.',
        SUCCESS_TITLE : '회원탈퇴 성공',
        SUCCESS_DESCRIPTION : '회원탈퇴가 완료되었습니다.',
    },
} as const;

const errorMessages = {
    NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
    SERVER_ERROR: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    UNKNOWN_ERROR: '알수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
} as const;

const uiTexts = {
    FEED: {
        ALL_RECORDS: '전체 기록',
        LOAD_MORE: 'more',
    },
} as const;

export { alerts, errorMessages, uiTexts };
