import { StyleSheet , View , Text , Pressable } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

function Button({ children , onPress , mode, }){

    return(
        <View style={styles.container}> 
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={[styles.button , mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText , mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );

}

export default Button;

const styles = StyleSheet.create({

    container:{
        height: 40,
        width: '40%',
        margin: 12,
    },
    button:{
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.dark,
    },
    flat:{
        backgroundColor: 'transparent'
    },
    buttonText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    },
    flatText:{
        color: GlobalStyles.colors.primary200
    },
    pressed:{
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }
});
