/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
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

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [images, setimages] = useState([]);

  fetch('http://192.168.0.103:20003/images')
    .then(res => res.json())
    .then(data => {
      if (images.length === 0) {
        console.log(data.files);
        setimages(data.files);
      }
    })
    .catch(error => {
      return {error_code: -3, error_msg: '请求异常，请重试'};
    });
  //打开相机
  const _launchCamera = () => {
    //配置选项
    const options = {
      cameraType: 'front', //前置摄像头
      mediaType: 'photo', //进行拍照
    };

    //回调数据
    launchCamera(options, response => {
      uploadImage(response.uri);
    });
  };

  //打开图库
  const _launchImageLibrary = () => {
    //配置选项
    const options = {mediaType: 'photo'};

    //回调数据
    launchImageLibrary(options, response => {
      uploadImage(response.uri);
    });
  };
  const uploadImage = params => {
    console.log('uploading.....');
    var filename = params.substring(params.lastIndexOf('/') + 1);
    RNFetchBlob.fetch(
      'POST',
      'http://192.168.0.103:20003/upload',
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'avatar-foo',
          type: 'image/jpg',
          filename: filename,
          data: RNFetchBlob.wrap(params),
        },
      ],
    ).then(res => {
      setimages([]);
    });
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
            {images.map((info, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    fetch('http://192.168.0.103:20003/search/' + info)
                      .then(response => response.json())
                      .then(output => {
                        Alert.alert(output.result);
                      });
                  }}>
                  <Image
                    source={{
                      uri: 'http://192.168.0.103:20003/static/' + info,
                    }}
                    style={styles.imageSize}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.container}>
            <TouchableHighlight onPress={_launchCamera.bind(this)}>
              <Text style={styles.buttonStyle}>打开相机</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={_launchImageLibrary.bind(this)}>
              <Text style={styles.buttonStyle}>打开图库</Text>
            </TouchableHighlight>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonStyle: {
    color: 'red',
    marginTop: 30,
    fontSize: 30,
  },
});

export default App;
