import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { API_KEY } from "@env";

import * as Location from "expo-location";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [city2, setCity2] = useState();
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  //  1. 유저 위치 permission

  const getWeather = async () => {
    // 1. 유저 위치 permission
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

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await res.json();
    setDays(
      json.list.filter((weather) => {
        if (weather.dt_txt.includes("00:00:00")) {
          return weather;
        }
      })
    );
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.continer}>
      <View style={styles.city}>
        <Text>현재 위치</Text>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.cityName}>{city2}</Text>
      </View>
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.weathger}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            {/* 로딩 중 */}
            <ActivityIndicator color="gray" size="large" />
          </View>
        ) : (
          days.map((day, i) => (
            <View key={i} style={styles.day}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(0)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={60}
                  color="white"
                />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              <Text style={styles.tinyText}>
                {day.dt_txt
                  .substring(0, 10)
                  .replace(/-/g, "년 ")
                  .replace(/-/g, "월 ")}
                일 날씨
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: "white",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -20,
  },
  cityName: {
    fontSize: 40,
    fontWeight: "200",
  },
  weathger: {
    backgroundColor: "orange",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 120,
    color: "white",
  },
  description: {
    marginTop: -20,
    fontSize: 50,
    color: "white",
  },
  tinyText: {
    fontSize: 20,
    color: "white",
  },
});
