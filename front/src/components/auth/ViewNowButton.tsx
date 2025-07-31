import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ViewNow = ({ onPress }: { onPress: () => void }) => (
  <View style={style.easyStartContainer}>
    <View>
      <View style={style.textContainer}>
        <View style={style.locationIcon}>
          <MaterialIcons name={'location-on'} color={'#000000'} size={45}/>
        </View>
        <Text style={style.title}>
          시작은 가볍게
        </Text>
        <Text style={style.subTitle}>
          로그인 없이도 환경을{'\n'}
          위한 첫 걸음을 땔 수 있어요.
        </Text>
      </View>
      <Pressable style={style.viewNowContainer} onPress={onPress}>
        <Ionicons name={'trash-sharp'} color={'#000000'} size={35} />
        <Text style={style.subTitle}>View Now</Text>
        <View style={style.chevronContainer}>
          <Ionicons name="chevron-forward-sharp" color="#8f8f8f" size={20} />
          <Ionicons
            name="chevron-forward-sharp"
            color="#000000"
            size={20}
            style={style.chevronIconSpacing}
          />
        </View>
      </Pressable>
    </View>
    <View style={style.backgroundIconContainer}>
              <MaterialIcons
              name={'forest'}
              color={'#7F9F03'}
              size={130}
              style={style.forestIcon}
              />
              </View>
  </View>
);

const style = StyleSheet.create({
  easyStartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: Dimensions.get('screen').width * 0.05,
    paddingVertical: Dimensions.get('screen').height * 0.025,
    backgroundColor: '#BEEE05',
    borderRadius: 10,
    overflow: 'hidden',
    gap: Dimensions.get('screen').height * 0.01,
  },
  textContainer: {
    paddingLeft: Dimensions.get('screen').width * 0.04,
  },
  locationIcon: {
    backgroundColor: '#ffffff',
    width: Dimensions.get('screen').height * 0.07,
    height: Dimensions.get('screen').height * 0.07,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimensions.get('screen').height * 0.01,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    paddingBottom: Dimensions.get('screen').height * 0.002,
  },
  subTitle: {
    fontSize: 13,
  },
  viewNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 120,
    paddingHorizontal: Dimensions.get('screen').width * 0.05,
    paddingVertical: Dimensions.get('screen').height * 0.015,
    marginTop: Dimensions.get('screen').height * 0.01,
    gap: Dimensions.get('screen').height * 0.01,
  },
  chevronContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronIconSpacing: {
    marginLeft: -10,
  },
   backgroundIconContainer: {
      marginTop: Dimensions.get('screen').height * 0.06,
      maxWidth: 140,
      maxHeight: 140,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    forestIcon: {
      maxWidth: 140,
      maxHeight: 140,
    },
});

export default ViewNow;
