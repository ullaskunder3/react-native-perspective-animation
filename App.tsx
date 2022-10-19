import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

const Circle = ({ onPress, animatedValue }: any) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1]
  const switchBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['#90d5f7', '#90d5f7', '#90d5f7', '#0D2035', '#0D2035']  
  });
  
  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['#0D2035', '#0D2035', '#0D2035', '#90d5f7', '#90d5f7', ]  
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, styles.circleContainer, {
      backgroundColor: switchBg,
    }]}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBg,
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                })
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 50, 0],
                })
              }
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View>
            <Text style={styles.circleBtn}>Roma</Text>
            <Text>pritam </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

export default function App() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = (toValue:number) => Animated.timing(animatedValue, {
    toValue,
    duration: 3000,
    useNativeDriver: false
  })
  const [index, setIndex] = useState(0);
  const onPress = () => {
    console.log('Animate');
    setIndex(index === 1?0:1);
    animation(index === 1?0:1).start();
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circleContainer: {
    flex: 1,
    // backgroundColor: '#ffdd81',
    backgroundColor: '#90d5f7',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100
  },
  circle: {
    backgroundColor: '#0D2035',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleBtn: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase'
  }
});
