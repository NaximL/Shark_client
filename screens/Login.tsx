import React, { useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { gstyles } from '../styles/gstyles';
import { storeData } from "../components/LocalStorage"
import { login } from '../api/MH/login';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  // Add other routes here if needed
};

const Login = () => {
  const loginRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [logins, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>(); 

const Save = () => {
  if (!logins.trim()) {
    Alert.alert('Помилка', 'Будь ласка, введіть логін');
    return;
  }
  if (!password.trim()) {
    Alert.alert('Помилка', 'Будь ласка, введіть пароль');
    return;
  }

  login(logins, password).then((data) => {

      storeData("login", logins);
      storeData("password", password);
      alert('Ви успішно увійшли!')
  
     navigation.navigate('Home');
          
        
    
  
  }).catch((e) => {
    Alert.alert('Помилка', 'Сервер не відповідає');
    console.error(e);
  });
};

  useEffect(() => {
    loginRef.current?.focus();
    passwordRef.current?.focus();
  }, []);

return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={gstyles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/Icons/icon.png')}
                        resizeMode="contain"
                        style={styles.logo}
                    />
                    <Text style={styles.title}>FastShark</Text>
                    <Text style={styles.subtitle}>Пірнай у нормальний клієнт моєї школи</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        ref={loginRef}
                        style={styles.input}
                        placeholder="Логін"
                        placeholderTextColor="#aaa"
                        returnKeyType="next"
                        value={logins}
                        onChangeText={setLogin}
                    />
                    <TextInput
                        ref={passwordRef}
                        style={styles.input}
                        placeholder="Пароль"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        returnKeyType="done"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={Save}>
                        <Text style={styles.buttonText}>Увійти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  form: {
    width: '85%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {

    boxShadow: '0px 2px 4px #0080ff33',
    backgroundColor: '#0080ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Login;