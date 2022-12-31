import { useState, useContext, useEffect } from "react";

import { StyleSheet, View, Text, Image, TextInput, Alert, ScrollView } from "react-native";

import { GlobalStyles } from "../constants/styles";

import { Octicons, Ionicons } from '@expo/vector-icons'; 

import LoadingOverlay from "../components/UI/LoadingOverlay";

import Button from "../components/UI/Button";

import { login } from "../util/request";

import { AuthContext } from "../store/auth-context";

import { LinearGradient } from "expo-linear-gradient";

import { girisYap } from "../firebase/auth";


function LoginScreen({navigation,route}){

    const mail = route.params?.email;
    const sifre = route.params?.password;

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    const authCtx = useContext(AuthContext);

    const [girisYaptiMi, setGirisYaptiMi] = useState(false);

  
    useEffect(()=>{
        setEmail(mail);
        setPassword(sifre);
    },[navigation,route]);


    function saveEmail(textData){

        setEmail(textData);
    }

    function savePassword(textData){

        setPassword(textData);
    }

    async function loginControl(){
        setGirisYaptiMi(true);
        try {
            const uid = await girisYap(email,password);
            authCtx.authenticate(uid.user.uid);
        } catch (error) {
            Alert.alert('Failed to logging please try again');
        }
        setGirisYaptiMi(false);
    }

    if(girisYaptiMi){
        return(
            <LoadingOverlay />
        );
    }

    function signUp(){
        navigation.navigate('KayitEkrani');
    }


    return(
        <LinearGradient 
            style={styles.mainContainer}
            colors={['#f69595ff','#f38282ff','#f76969ff','#f55959ff']}
        >
            <Image
                style={styles.image}
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wikipedia_svg_logo.svg/2048px-Wikipedia_svg_logo.svg.png'
                }}
            />
            <View style={styles.secondContainer}>
                <Octicons name="person" size={35} color="black" />
                <TextInput 
                        style={styles.input}
                        keyboardType={"email-address"}
                        placeholder={"E-mail"}
                        placeholderTextColor={GlobalStyles.colors.dark}
                        textAlign={'center'}
                        value={email}
                        onChangeText={saveEmail}      
                                    
                />
            </View>
            <View style={styles.secondContainer}>
                <Ionicons name="ios-key" size={30} color="black" />
                <TextInput 
                        style={styles.input}
                        keyboardType={"email-address"}
                        placeholder={"Password"}
                        placeholderTextColor={GlobalStyles.colors.dark}
                        textAlign={'center'}
                        value={password}
                        onChangeText={savePassword}      
                       
                />
            </View>
            <Button onPress={loginControl}>Login</Button>

            <View style={styles.singUpContainer}>
                <Text style={styles.singUpText}>Don't have an account ?</Text>
                <Button onPress={signUp}>Sign Up</Button>
            </View>
           
        </LinearGradient>
    );

}

export default LoginScreen;

const styles = StyleSheet.create({

    mainContainer:{
        
        flex:1,
        alignItems: 'center',
        paddingTop: 50,
    },
    image:{
        height: 270,
        width: 270
    },
    secondContainer:{
       flexDirection:'row',
       alignItems: 'center',
       padding: 15
    },
    input:{
        height: 40,
        width: '80%',
        margin: 5,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: GlobalStyles.colors.dark,
        color: GlobalStyles.colors.dark,
        fontSize: 17
    },
    singUpContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    singUpText:{
        fontSize: 17,
        fontFamily: 'sans-serif-medium'
    }

});