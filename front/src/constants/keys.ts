const queryKeys = {
    AUTH: 'auth',
    GET_ACCESS_TOKEN: 'getAccessToken',
    GET_PROFILE: 'getProfile',
    POST: 'post',
    GET_POST: 'getPost',
    GET_POSTS: 'getPosts',
    FAVORITE: 'favorite',
    GET_FAVORITE_POSTS: 'getFavoritePosts',
} as const;

const storageKeys = {
    REFRESH_TOKEN: 'refreshToken',
 } as const;

export { queryKeys, storageKeys };