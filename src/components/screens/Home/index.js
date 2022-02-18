import React, {useEffect} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {
    Button
} from 'react-native-elements'
import Header from '../../Header'
import auth from '@react-native-firebase/auth';

const Home = (props) => {

    useEffect(() => {
        auth().onAuthStateChanged(function(user){
            if(user){
                props.navigation.navigate('listAll')
            }
        })
    }, [])

    return(
        <SafeAreaView style={styles.screenStyle}>
            <Header/>

            <View style={styles.container}>

                <Text style={styles.title}> Save Food</Text>
                <View style={styles.paragraph}>
                    <Text style={styles.content}>Bem vindo a aplicação SAVE FOOD !</Text>
                    <Text style={styles.content}>Seu aplicativo de gerenciamento de alimentos 
                        domesticos para minimizar o descarte de alimentos 
                        vencidos e ajudara melhorar a situação da fome no 
                        mundo evitando o descarte desnecessário de alimentos.</Text> 
                </View>
                <View style={styles.buttonStyle}>
                    <Button  
                        title="Cadastrar"
                        onPress={() => props.navigation.navigate('userRegister') } 
                        type='outline'
                        buttonStyle={styles.buttonRegister}
                        titleStyle={styles.buttonText}
                        />

                    <Button  
                        title="Login"
                        onPress={() => props.navigation.navigate('login') }  
                        type='outline'
                        buttonStyle={styles.buttonLogin}
                        titleStyle={styles.buttonText}
                        />
                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenStyle:{
        flex:1,
        backgroundColor:'#F6F7EB'
    },

    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    
    title:{
        fontSize: 36,
        fontFamily: "Risque-Regular",
        color: '#000000',
        margin: 16,
        textShadowColor:'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 4},
        textShadowRadius: 4
    },

    content:{
        fontSize: 24,
        fontFamily: "PatrickHand-Regular",
        textAlign:'justify',
        color: '#000000'
    },

    paragraph:{
        textAlign:'justify',
        margin: 16,
        paddingLeft: 8,
        paddingRight: 8
    },

    buttonStyle:{
        flexDirection:"row",
        justifyContent:'space-between'

    },

    buttonRegister:{
        backgroundColor: '#393E41',
        borderRadius: 5,
        margin: 16,
        width:120, 
        height:55
    },

    buttonLogin:{
        backgroundColor: '#E94F37',
        borderRadius: 5,
        margin: 16,
        width:120, 
        height:55
    },

    buttonText:{
        fontFamily: "PatrickHand-Regular",
        color: '#F6F7EB',
        fontSize: 24
    }
})

export default Home