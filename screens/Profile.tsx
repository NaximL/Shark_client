import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import useBalStore from '../store/BalStore';
import useProfileStore from '../store/ProfileStore';
import { gstyles } from '../styles/gstyles';
import { getData, removeData } from '../components/LocalStorage';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {

  const navigation = useNavigation<any>();
  const Profile = useProfileStore((state) => state.Prof);
  const Bal = useBalStore((state) => state.bal);

  const [login, setLogin] = React.useState<string | null>(null);

  useEffect(() => {
    getData('login').then(setLogin);
  }, []);
  const logout = async () => {
    await removeData('login');
    navigation.reset({
      index: 0,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f7f7f7' }}
      contentContainerStyle={{ padding: 24 }}
    >
      {/* Profile Block */}
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: '#e0e0e0',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 48 }}>🧑‍🎓</Text>
        </View>
        <Text style={{ fontSize: 26, fontWeight: '600' }}>{Profile[0]}</Text>
        <Text style={{ color: '#888', fontSize: 16 }}>{` ${Profile[15]} • ${Profile[22]} `}</Text>
      </View>

      {/* Login & Password Block */}
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          elevation: 2,
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 18, marginBottom: 6 }}>Логін</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#444', flex: 1 }}>{login}</Text>
            <TouchableOpacity>
              <Text style={{ color: '#1976d2', fontSize: 14 }}>Змінити логін</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 18, marginBottom: 6 }}>{ }</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#444', flex: 1 }}>********</Text>
            <TouchableOpacity>
              <Text style={{ color: '#1976d2', fontSize: 14 }}>Змінити пароль</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Average Score Block */}
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          elevation: 2,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: '#e1bee7',
            borderRadius: 50,
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}
        >
          <Text
            style={{
              fontSize: Bal && Bal.toString().length > 4 ? 19 : 24,
              color: '#7b1fa2',
              fontWeight: 'bold',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {Bal}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 2 }}>Середній бал</Text>
          <Text style={{ color: '#888', fontSize: 15 }}>Ваша успішність зростає!</Text>
        </View>
      </View>

      {/* Teachers Block */}
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 20,
          marginBottom: 32,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginBottom: 16,
            fontWeight: '700',
            color: '#1976d2',
            letterSpacing: 0.5,
          }}
        >
          Мої вчителі
        </Text>
        <View style={{ gap: 12 }}>
          {/* Математика */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#e3f2fd',
              borderRadius: 10,
              padding: 12,
              shadowColor: '#1976d2',
              shadowOpacity: 0.08,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: '#bbdefb',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 20, color: '#1976d2' }}>📐</Text>
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#1976d2' }}>Математика</Text>
              <Text style={{ color: '#444', fontSize: 15 }}>Олена Петрівна Ковальчук</Text>
            </View>
          </View>
          {/* Українська мова */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fce4ec',
              borderRadius: 10,
              padding: 12,
              shadowColor: '#d81b60',
              shadowOpacity: 0.08,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: '#f8bbd0',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 20, color: '#d81b60' }}>📖</Text>
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#d81b60' }}>Українська мова</Text>
              <Text style={{ color: '#444', fontSize: 15 }}>Ірина Василівна Шевченко</Text>
            </View>
          </View>
          {/* Інформатика */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#e8f5e9',
              borderRadius: 10,
              padding: 12,
              shadowColor: '#388e3c',
              shadowOpacity: 0.08,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: '#c8e6c9',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 20, color: '#388e3c' }}>💻</Text>
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#388e3c' }}>Інформатика</Text>
              <Text style={{ color: '#444', fontSize: 15 }}>Сергій Олександрович Бондар</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={[gstyles.container, { backgroundColor: '#f7f7f7' }]} onPress={logout}>
        <Text style={{ color: '#d21919', fontSize: 16 }}>Вийти</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}