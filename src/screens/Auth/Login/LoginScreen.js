import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, KeyboardAvoidingView} from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../../../firebase/FirebaseConfig';
import { async } from '@firebase/util';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

const signIn = async () => {
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth,email,password);
        console.log(response);
    } catch(error) {
        console.log(error)
        alert('Sign in failed: ' + error.message);
    } finally{
        setLoading(false);
    }
}

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>

        {loading ? (
            <ActivityIndicator size="large" color="#000ff"/>
        ) : (
        <>
            <Button title='Login' onPress={() => signIn()}/>
        </>
        )}
    </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

