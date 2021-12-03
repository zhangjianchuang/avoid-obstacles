/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.meContainer}>
            <Image style={styles.me} source={require('./img/me.jpeg')} />
            <Section title="My andriod project">
              <Text style={styles.highlight}>
                Hello World
                {'\n'}
              </Text>
              <Text style={styles.highlight}>
                Hello JianChuang Zhang
                {'\n'}
                {'\n'}
              </Text>
            </Section>
          </View>

          <View style={styles.parentContainer}>
            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/1.jpeg')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/1.jpeg'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/2.jpeg')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/2.jpeg'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/3.jpeg')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/3.jpeg'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/4.jpeg')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/4.jpeg'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/5.jpeg')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/5.jpeg'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/6.jpeg')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/6.jpeg'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/7.png')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/7.png'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/8.png')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/8.png'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/9.png')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/9.png'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                fetch('http://192.168.0.103:20003/search/10.png')
                  .then(response => response.json())
                  .then(output => {
                    Alert.alert(output.result);
                  });
              }}>
              <Image
                source={{uri: 'http://192.168.0.103:20003/static/10.png'}}
                style={styles.imageSize}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  imageSize: {
    flex: 0,
    width: 90,
    height: 90,
  },
  me: {
    width: 80,
    height: 80,
    marginTop: 40,
    marginLeft: 10,
  },
  meContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  parentContainer: {
    flexWrap: 'wrap',
    flex: 4,
    flexDirection: 'row',
  },
});

export default App;
