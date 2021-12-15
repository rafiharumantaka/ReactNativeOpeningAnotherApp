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
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Button,
  Linking,
  Platform,
  Text,
} from 'react-native';

import {
  AppInstalledChecker,
  CheckPackageInstallation,
} from 'react-native-check-app-install';

const App: () => Node = () => {
  const checkInstalledApp = appName => {
    const appOptions = {
      instagram: {
        downloadAndroid:
          'http://play.google.com/store/apps/details?id=com.instagram.android',
        downloadIos: 'http://apps.apple.com/us/app/instagram/id389801252',
        openLink: 'https://www.instagram.com/',
      },
      slack: {
        downloadAndroid:
          'http://play.google.com/store/apps/details?id=com.Slack',
        downloadIos: 'http://apps.apple.com/us/app/slack/id618783545',
        openLink: 'slack://open',
      },
      youtube: {
        downloadAndroid: 'https://play.google.com/store/apps/details?id=com.google.android.youtube',
        downloadIos: 'https://apps.apple.com/id/app/youtube/id544007664',
        openLink: 'https://www.youtube.com'
      }
    };

    var downloadUrlAndroid;
    var downloadUrlIos;
    var deepLink;

    if (appName === 'instagram') {
      downloadUrlAndroid = appOptions.instagram.downloadAndroid;
      downloadUrlIos = appOptions.instagram.downloadIos;
      deepLink = appOptions.instagram.openLink;
    } else if (appName === 'slack') {
      downloadUrlAndroid = appOptions.slack.downloadAndroid;
      downloadUrlIos = appOptions.slack.downloadIos;
      deepLink = appOptions.slack.openLink;
    } else if (appName === 'youtube') {
      downloadUrlAndroid = appOptions.youtube.downloadAndroid;
      downloadUrlIos = appOptions.youtube.downloadIos;
      deepLink = appOptions.youtube.openLink;
    }

    AppInstalledChecker.isAppInstalled(appName).then(isInstalled => {
      // isInstalled is true if the app is installed or false if not
      if (!isInstalled) {
        let downloadUrl = downloadUrlAndroid;
        if (Platform.OS === 'ios') {
          downloadUrl = downloadUrlIos;
        }
        Linking.openURL(downloadUrl)
          .then(result => {
            console.log(isInstalled);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Linking.openURL(deepLink)
          .then(result => {
            console.log(isInstalled);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.button}>
            <Button
              title="Check Instagram is installed"
              onPress={checkInstalledApp.bind(this, 'instagram')}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Check Slack is installed"
              onPress={checkInstalledApp.bind(this, 'slack')}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Check Youtube App is installed"
              onPress={checkInstalledApp.bind(this, 'youtube')}
            />
          </View>
          <Text>Opening app with ex: slack://app still not working on Android 11 / SDK 30</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 24,
    flex: 1,
  },
  button: {
    marginVertical: 16
  }
});

export default App;
