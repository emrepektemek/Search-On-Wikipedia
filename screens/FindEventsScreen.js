import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TextInput, Alert } from "react-native";

import { GlobalStyles } from "../constants/styles";

import { LinearGradient } from "expo-linear-gradient";

import Button from "../components/UI/Button";
import ExitButton from "../components/UI/ExitButton";
import HistoryButton from "../components/UI/HistoryButton";

import { AuthContext } from "../store/auth-context";

import LoadingOverlay from "../components/UI/LoadingOverlay";
import { UserSearchHistoryContext } from "../store/user-search-history-context";

import { collection, query, where, getDocs, arrayRemove,addDoc, Timestamp } from "firebase/firestore";
import { getDbObject } from "../firebase/FireBaseObjects";

function FindEventsScreen({navigation}){

    const [day,setDay] = useState(0);
    const [month,setMonth] = useState(0);

    const [gunHata,setGunHata] = useState(1);
    const [ayHata,setAyHata] = useState(1);

    const [gecmisGetirildiMi , setGecmisGetirildiMi ] = useState(true); 

    const [kayitEdildiMi , setKayitEdildiMi ] = useState(true);
    
    const authCtx = useContext(AuthContext);

    const historyCtx = useContext(UserSearchHistoryContext);

    const db = getDbObject();

    useEffect(() => {
        async function getUserSearchHistory(){
            if(historyCtx.SearchHistory.length>0){
            }
            else{
                    setGecmisGetirildiMi(false);
                try {   
                    const q = query(collection(db, "usersearchhistory"),where("userId", "==", authCtx.token));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc)=>{
                        historyCtx.addUserSearchHistory(doc.data());
                    });
                } catch (error) {
                    Alert.alert('Besinleriniz getirilemedi lütfen internet bağlantınızı kontrol ediniz');
                }
                setGecmisGetirildiMi(true); 
            }
            
        }
        getUserSearchHistory();
    },[]);
    
    function saveDay(day){
        setDay(day);
        if(!day.startsWith(0)){
            // Şubat ayı(max 29 gün)
            if(month == 2){
                if(day>0 && day<=29){
                    setGunHata(0);
                }
                else{
                    setGunHata(1);    
                }
            }
            // 30 günlük aylar
            else if(month == 4 || month == 6 || month == 9 || month == 11){
                if(day>0 && day<=30){
                    setGunHata(0);
                }
                else{
                    setGunHata(1);    
                }   
            }
            // Geri kalan aylar(31 gün)
            else{
                if(day>0 && day<=31){
                    setGunHata(0);  
                }
                else{
                    setGunHata(1);    
                } 
            }
        }
        else {
            setGunHata(1);
        }  
    }

    function saveMonth(month){
        setMonth(month);
        if(month>0 && month<=12 && !month.startsWith(0)){
            // Şubat ayı(max 29 gün)
            if(month == 2){
                if(day>0 && day<=29 && !day.startsWith(0)){
                    setGunHata(0);
                }
                else{
                    setGunHata(1);    
                }
            }
            // 30 günlük aylar
            else if(month == 4 || month == 6 || month == 9 || month == 11){
                if(day>0 && day<=30 && !day.startsWith(0)){
                    setGunHata(0);
                }
                else{
                    setGunHata(1);    
                }   
            }
            // Geri kalan aylar(31 gün)
            else{
                if(day>0 && day<=31 && !day.startsWith(0)){
                    setGunHata(0);  
                }
                else{
                    setGunHata(1);    
                } 
            }
            setAyHata(0);
        }
        else{
            setAyHata(1);
        }
    }

    function goSearchHistoryScreen(){
        navigation.navigate('GecmisAralamarEkrani');
    }

    async function searchEvents(){
        
        if(gunHata == 0 && ayHata == 0){

            setKayitEdildiMi(false); 
            try {
                const db = getDbObject();
                const docRef = await addDoc(collection(db, "usersearchhistory"), {
                    userId: authCtx.token,
                    gun: day,
                    ay: month,
                    aramaTuru: 'Events',
                    eklemeTarihi: Timestamp.fromDate(new Date())
                  });

                historyCtx.addUserSearchHistory({
                    userId: authCtx.token,
                    gun: day,
                    ay: month,
                    aramaTuru: 'Events',
                    eklemeTarihi: Timestamp.fromDate(new Date())
                });

                setKayitEdildiMi(true); 
            } catch (error) {
                Alert.alert(error.toString());
                setKayitEdildiMi(true); 
            }
           
            navigation.navigate('OlaylarEkrani',{day: day, month: month});
            setDay(null);
            setMonth(null);
            setGunHata(1);
            setAyHata(1);
        }
        else{
            Alert.alert(
                "Wrong Input",
                "Please check the day and month value.\nThe day and month value can't start with 0.\nThe day represented with a value between 1 and 31.\nThe month represented with a value between 1 and 12.\n1,3,5,7,8,10 and 12. months are lasts 31 days.\n4,6,9 and 11. months are lasts 30 days while 2. month lasts max 29 days.",
                [
                    { text: "OK", onPress: () => {} }
                ]
            );
        }
    }

    function uygulamadanCik(){
        historyCtx.SearchHistory= [];
        authCtx.logout();
    }

    if(!kayitEdildiMi || !gecmisGetirildiMi){
        return(
          <LoadingOverlay/>
        );
    }
    
    
    return(
        <LinearGradient 
            style={styles.mainContainer} 
            colors={['#fff7bcf2','#ffda83','#fbbb67','#f69a3e']}
        >
            <View style={styles.exitContainer}>
                <ExitButton 
                    size={33}
                    icon="exit-outline"
                    color={GlobalStyles.colors.dark}
                    onPress={uygulamadanCik}
                />
                <HistoryButton
                     size={26}
                     icon="history"
                     color={GlobalStyles.colors.dark}
                     onPress={goSearchHistoryScreen}
                />  
            </View>
            <Text style={styles.text}>Wikipedia Find Events</Text>
            <Image
                style={styles.image}
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wikipedia_svg_logo.svg/2048px-Wikipedia_svg_logo.svg.png'
                }}
            />
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    keyboardType={"number-pad"}
                    maxLength={2}
                    placeholder={"Day (1-31)"}
                    placeholderTextColor={GlobalStyles.colors.dark}
                    textAlign={'center'}
                    value={day}
                    onChangeText={saveDay}              
                />
                <TextInput 
                    style={styles.input}
                    keyboardType={"number-pad"}
                    maxLength={2}
                    placeholder={"Month (1-12)"}
                    placeholderTextColor={GlobalStyles.colors.dark}
                    textAlign={'center'}
                    value={month}
                    onChangeText={saveMonth}    
                />
            </View>
            <Button onPress={searchEvents}>Search</Button>
        </LinearGradient>
    );
}

export default FindEventsScreen;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        alignItems: 'center'
    },
    exitContainer:{
        alignItems: 'center',
        marginTop: 30,
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse'
    },
    image:{
        height: 300,
        width: 300
    },
    text:{
        textAlign: 'center',
        padding: 10,
        fontSize: 25,
        fontWeight: '450',
        letterSpacing: 3,
        color: GlobalStyles.colors.dark,
        fontFamily: 'serif'
    },
    inputContainer:{
        flexDirection: 'row',
        padding: 10
    },
    input:{
        height: 40,
        width: '50%',
        margin: 4,
        borderWidth: 1,
        padding: 4,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: GlobalStyles.colors.dark,
        color: GlobalStyles.colors.dark,
        fontSize: 17,
        marginBottom: 14
    }
});