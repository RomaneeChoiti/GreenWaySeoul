import 'dotenv/config';


export default {
  "expo": {
    "name": "GreenWaySeoul",
    "slug": "GreenWaySeoul",
    "version": "1.2.0",
    "orientation": "portrait",
    "jsEngine": "hermes",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splashImage.png",
      "resizeMode": "cover"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.tmd1568.GreenWaySeoul"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/splashImage.png",
        "resizeMode": "cover"
      },
      "package": "com.tmd1568.GreenWaySeoul"
    },
    "web": {},
    "extra": {
      "eas": {
        "projectId": "0b973cdb-e9dc-4eaf-bdec-d5d3a9b9f6ec"
      },
      "apiBaseUrl": process.env.API_BASE_URL,
    },
    "owner": "tmd1568",
    "runtimeVersion": "1.0.1",
    "updates": {
      "url": "https://u.expo.dev/0b973cdb-e9dc-4eaf-bdec-d5d3a9b9f6ec"
    }
  }
}
