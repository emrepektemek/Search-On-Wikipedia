
import { StyleSheet , View , Text , Pressable } from 'react-native';

import { Octicons } from '@expo/vector-icons'; 

function HistoryButton({ icon , size , color , onPress }){

    return(
        <Pressable 
            onPress={onPress} 
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.buttonContainer}>
                <Octicons 
                    name={icon}
                    size={size}
                    color={color}
                />
            </View>
        </Pressable>
    );

}

export default HistoryButton;

const styles = StyleSheet.create({

    buttonContainer:{
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed:{
        opacity: 0.75
    }
});