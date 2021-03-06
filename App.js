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
        downloadAndroid:
          'https://play.google.com/store/apps/details?id=com.google.android.youtube',
        downloadIos: 'https://apps.apple.com/id/app/youtube/id544007664',
        openLink: 'https://www.youtube.com',
      },
      map: {
        downloadAndroid: 'https://apps.apple.com/us/app/apple-maps/id915056765',
        downloadIos: 'https://apps.apple.com/us/app/apple-maps/id915056765',
        openLink: 'http://maps.apple.com/?ll=37.484847,-122.148386',
      },
    };

    var downloadUrlAndroid;
    var downloadUrlIos;
    var deepLink;

    // Opening third party apps
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
    } else if (appName === 'map') {
      downloadUrlAndroid = appOptions.map.downloadAndroid;
      downloadUrlIos = appOptions.map.downloadIos;
      deepLink = appOptions.map.openLink;
    }

    Linking.canOpenURL(deepLink)
      .then(result => {
        if (result) {
          try {
            AppInstalledChecker.isAppInstalled(appName).then(isInstalled => {
              if (!isInstalled) {
                let downloadUrl = downloadUrlAndroid;
                if (Platform.OS === 'ios') {
                  downloadUrl = downloadUrlIos;
                }
                Linking.openURL(downloadUrl)
                  .then(result => {})
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                Linking.openURL(deepLink)
                  .then(result => {})
                  .catch(err => {
                    console.log('=========');
                    console.log(err);
                  });
              }
            });
          } catch (error) {
            // Case for the link can be opened but the app is not listed on the module (ex: apple maps)
            if (result) {
              Linking.openURL(deepLink);
            }
          }
        } else {
          console.log(result);
          if (Platform.OS === 'android') {
            Linking.openURL(downloadUrlAndroid)
              .then(result => {})
              .catch(err => {});
          } else {
            Linking.openURL(downloadUrlIos)
              .then(result => {})
              .catch(err => {});
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.button}>
            <Button
              // disabled={Platform.OS !== 'android'}
              title="Check Instagram is installed"
              onPress={checkInstalledApp.bind(this, 'instagram')}
            />
          </View>
          <View style={styles.button}>
            <Button
              // disabled={Platform.OS !== 'android'}
              title="Check Slack is installed"
              onPress={checkInstalledApp.bind(this, 'slack')}
            />
          </View>
          <View style={styles.button}>
            <Button
              // disabled={Platform.OS !== 'android'}
              title="Check Youtube App is installed"
              onPress={checkInstalledApp.bind(this, 'youtube')}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="[IOS] Check Opening Map app"
              // disabled={Platform.OS !== 'ios'}
              onPress={checkInstalledApp.bind(this, 'map')}
            />
          </View>
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
    marginVertical: 16,
  },
});

export default App;
