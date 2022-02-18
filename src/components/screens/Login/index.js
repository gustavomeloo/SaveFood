import React, {useState} from 'react'
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {
    Input,
    Button
} from 'react-native-elements'
import Header from '../../Header'
import auth, { firebase } from '@react-native-firebase/auth';

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginFirebase = () => {
        auth().signInWithEmailAndPassword(email,password)
        .then(() => {
            props.navigation.navigate('listAll')
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Usuário não encontrado!')
            }

            if (error.code === 'auth/invalid-email') {
                Alert.alert('Email inválido!')
            }

            if(error.code === 'auth/invalid-password') {
                Alert.alert('Senha inválida!')
            }
        })  
    }

    return(
        <ScrollView style={styles.screenStyle}>
            <SafeAreaView> 
                <Header/>
                <View style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                </View>
                <View style={styles.inputStyle}>
                    <Input 
                        label="Email"
                        inputContainerStyle={styles.container}
                        labelStyle={styles.labelStyle}
                        containerStyle={styles.boxStyle}
                        onChangeText={(txt) => setEmail(txt)}
                        />

                    <Input 
                        label="Senha"
                        secureTextEntry={true}
                        inputContainerStyle={styles.container}
                        labelStyle={styles.labelStyle}
                        containerStyle={styles.boxStyle}
                        onChangeText={(txt) => setPassword(txt)}
                        />
                </View>
                <View style={styles.buttonStyle}>
                        <Button  
                            title="Voltar"
                            onPress={() => props.navigation.reset({
                                index:1,
                                routes:[{name:'home'}]
                            }) } 
                            type='outline'
                            buttonStyle={styles.buttonRegister}
                            titleStyle={styles.buttonText}
                            />

                        <Button  
                            title="Entrar" 
                            type='outline'
                            buttonStyle={styles.buttonLogin}
                            titleStyle={styles.buttonText}
                            onPress={() => loginFirebase()} 
                            />
                    </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    
    screenStyle:{
        flex:1,
        backgroundColor:'#F6F7EB'
    },

    content:{
        justifyContent:"center",
        alignItems:'center'
    },

    title:{
        fontSize: 36,
        fontFamily: "PatrickHand-Regular",
        color: '#000000',
        margin: 16,
        textShadowColor:'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 4},
        textShadowRadius: 4
    },

    inputStyle:{
        margin: 16
    },

    labelStyle:{
        fontFamily: "PatrickHand-Regular",
        fontWeight: 'normal',
        color:"#000000",
        margin: 8,
        fontSize: 24

    },

    boxStyle:{
        textShadowColor:'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 0, height: 4},
        textShadowRadius: 4
    },

    container:{
        backgroundColor: "rgba(204, 204, 204, 0.8)",
        borderRadius: 20,
        borderBottomWidth: 0,
    },

    buttonStyle:{
        flexDirection:"row",
        justifyContent:'space-around'

    },

    buttonRegister:{
        backgroundColor: '#393E41',
        borderRadius: 5,
        margin: 16,
        width:100, 
        height:50
    },

    buttonLogin:{
        backgroundColor: '#E94F37',
        borderRadius: 5,
        margin: 16,
        width:100, 
        height:50
    },

    buttonText:{
        fontFamily: "PatrickHand-Regular",
        color: '#F6F7EB',
        fontSize: 24
    }
})

export default Login