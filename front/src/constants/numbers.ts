const numbers = {
    ACCESS_TOKEN_REFRESH_TIME: 1000 * 60 * 30,
    SPLASH_HIDE_DELAY: 500,
    INITIAL_DELTA: {
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    MAX_TREES: 8, // 최대 나무 개수
  } as const;

  export {numbers};
