// 상수화
// 이 파일은 내비게이션을 상수화하여 사용하기 위한 파일입니다.
const authNavigations = {
    AUTH_HOME: 'AuthHome',
    PREVIEW_MAP: 'PreviewMap',
    LOGIN: 'Login',
    SIGNUP: 'Signup',
    KAKAO: 'Kakao',
} as const;

const mainNavigations = {
    HOME: 'Home',
    FEED: 'Feed',
    SETTING: 'Setting',
} as const;

const mapNavigations = {
    MAP_HOME: 'MapHome',
    ADD_POST: 'AddPost',
} as const;

const feedNavigations = {
    FEED_HOME: 'FeedHome',
    FEED_DETAIL: 'FeedDetail',
    EDIT_POST: 'EditPost',
    IMAGE_SCREEN: 'ImageScreen',
} as const;

const feedTabNavigations = {
    FEED_HOME: 'FeedTabHome',
    FEED_FAVORITE: 'FeedTabFavorite',
} as const;

const settingNavigations = {
    SETTING_HOME: 'SettingHome',
    EDIT_PROFILE: 'EditProfile',
} as const;

export { authNavigations, mapNavigations, feedNavigations, mainNavigations, feedTabNavigations, settingNavigations };
