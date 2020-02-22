import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Platform,
  StatusBar
} from 'react-native';
import Animated from 'react-native-reanimated';

const images = [
  { id: 1, uri: require('./assets/img1.png') },
  { id: 2, uri: require('./assets/img2.png') },
  { id: 3, uri: require('./assets/img3.png') },
  { id: 4, uri: require('./assets/img4.png') }
];

const HEADER_HEIGHT =
  Platform.OS === 'ios' ? 115 : 70 + StatusBar.currentHeight;

export default function App() {
  const scrollY = new Animated.Value(0);
  const diffClamScrollY = new Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = new Animated.interpolate(diffClamScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT]
  });

  // setInterval(() => {
  //   console.log('scrollY',scrollY);
  //   console.log('diffClamScrollY',diffClamScrollY);
  //   console.log('headerY',headerY);

  // }, 300);
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: HEADER_HEIGHT,
          backgroundColor: 'grey',
          zIndex: 1000,
          elevation: 1000,
          transform: [{ translateY: headerY }],
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 45
        }}
      >
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Header Animation</Text>
      </Animated.View>
      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        {images.map(image => (
          <View
            key={image.id}
            style={{
              height: 350,
              margin: 20,
              borderRadius: 10,
              backgroundColor: 'black'
            }}
          >
            <Image
              style={{ flex: 1, height: null, width: null }}
              source={image.uri}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
