// 상수화
// 이 파일은 내비게이션을 상수화하여 사용하기 위한 파일입니다.
const authNavigations = {
    AUTH_HOME: 'AuthHome',
    MAP: 'Map',
    LOGIN: 'Login',
    SIGNUP: 'Signup',
} as const;

const mainNavigations = {
    HOME: 'Home',
    FEED: 'Feed',
} as const;

const mapNavigations = {
    MAP_HOME: 'MapHome',
    ADD_POST: 'AddPost',
} as const;

const feedNavigations = {
    FEED_HOME: 'FeedHome',
    FEED_DETAIL: 'FeedDetail',
    EDIT_POST: 'EditPost',
} as const;


export { authNavigations, mapNavigations, feedNavigations, mainNavigations };
