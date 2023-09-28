// import { useEffect } from "react";
// import * as Location from "expo-location";

/*
  const userLocation = async () => {
  const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    // 유저 위치 get value
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    setCity2(location[0].district);
  };

  useEffect(() => {
    userLocation();
  }, []);
  */
