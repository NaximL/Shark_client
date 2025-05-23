import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';



const Header: React.FC = ({  }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingTop: Platform.OS === 'ios' ? Math.min(insets.top, 0) : 0,
          paddingBottom: Platform.OS === 'ios' ? -20 : 0,
        },
      ]}
    >
      <View style={styles.container}>
        <View
          style={styles.iconContainer}>
          <Image
            source={require('../assets/Icons/icon.png')}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <Text
          style={styles.Zag}>
          FastShark
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(40 60 82)',
    padding: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
  },
  Zag: {
    fontWeight: '600',
    marginLeft: 15,
    fontSize: 30,
    color:"white"
  },
  safeArea: {
    backgroundColor: 'rgb(40 60 82)',
  },
});
