import { useEffect, useState, useContext } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import IconButton from "../components/UI/IconButton";

import { LinearGradient } from "expo-linear-gradient";

import { GlobalStyles } from "../constants/styles";

import { UserSearchHistoryContext } from "../store/user-search-history-context";

import { getTodayDateWithClock } from "../util/date";



function HistoryScreen({navigation}){

  const historyCtx = useContext(UserSearchHistoryContext);

  function geriDon(){
      navigation.goBack();
  }

  

  return(
      <LinearGradient 
          style={styles.mainContainer}
          colors={['#f69595ff','#f38282ff','#f76969ff','#f55959ff']}
      >
        <View style={styles.backButtonContainer}>
          <IconButton 
            icon="back"
            color={GlobalStyles.colors.dark} 
            size={40}
            onPress={geriDon} 
          />   
        </View>
        <Text style={styles.title}>Search History</Text>
          <FlatList 
              data={historyCtx.SearchHistory}
              keyExtractor={(item, index) => item.eklemeTarihi}
              renderItem={(data)=>{
                  let tarih = getTodayDateWithClock(data.item.eklemeTarihi.toDate());
                  return(
                    <View style={styles.historyContainer}>
                      <View style={styles.historyInfoContainer}>
                        <Text 
                          style={styles.historyInfoText}
                        >
                          You listed {data.item.gun}/{data.item.ay} dated {data.item.aramaTuru}
                        </Text>                         
                      </View>   
                      <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{tarih}</Text>    
                      </View>                                 
                  </View>
          );
        }}
      />
    </LinearGradient>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      backButtonContainer:{
        marginTop: 30
      },
      title:{
        textAlign: 'center',
          padding: 15,
          fontSize: 25,
          letterSpacing: 3,
          color: GlobalStyles.colors.dark,
          fontFamily: 'serif'
      },
      historyContainer:{
        marginHorizontal: 4,
        marginBottom: 20,
        borderWidth: 4,
        borderRadius: 10
      },
      historyInfoContainer:{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      },
      historyInfoText:{
        fontSize: 16,
        fontFamily: 'sans-serif-medium'
      },
      dateContainer:{
        padding: 10,
        alignItems: 'center'
      },
      dateText:{
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
      },
});

