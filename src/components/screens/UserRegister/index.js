import React, {useState} from 'react'

import {
    Alert,
    ScrollView,
    SafeAreaView,
    Text,
    View
} from 'react-native'

import {
    Button,
    Input
} from 'react-native-elements'

import Header from '../../Header'

import auth from '@react-native-firebase/auth';

const UserRegister = (props) => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const validate = () => {
        

        if (nome.trim().length === 0 || email.trim().length === 0 || senha.length === 0 || confirmarSenha.length === 0) {
            Alert.alert('Erro','Informe todos os campos corretamente.')
            return
        }

        if (senha != confirmarSenha) {
            Alert.alert('Erro','Senhas não conferem!')
            return
        }
  
        auth().createUserWithEmailAndPassword(email, senha)
        .then(() => props.navigation.navigate('login'))
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Erro','Email já existente!');
                return
            }
        
            if (error.code === 'auth/invalid-email') {
                Alert.alert('Erro', 'Email Inválido');
                return
            }

            if (error.code === 'auth/weak-password') {
                Alert.alert('Erro', 'Senha Fraca');
                return
            }

            Alert.alert(error.code)

        })
      }

    return(
        <ScrollView style={{flex : 1, backgroundColor : '#EB705B', padding : 16}}>
            <SafeAreaView >

                <Header/>

                <Input 
                    label='Nome' 
                    labelStyle={{color : '#FFF', paddingTop : 20}} 
                    onChangeText={(txt) => setNome(txt)} 
                    value={nome}
                    style={{backgroundColor : '#FFF', borderRadius : 10}}
                />

                <Input label='Email' 
                labelStyle={{color : '#FFF'}}
                onChangeText={(txt) => setEmail(txt)} value={email}
                style={{backgroundColor : '#FFF', borderRadius : 10}}
                />

                <Input label='Senha' 
                secureTextEntry
                labelStyle={{color : '#FFF'}}
                onChangeText={(txt) => setSenha(txt)} value={senha} 
                style={{backgroundColor : '#FFF', borderRadius : 10}}
                />

                <Input label='Confirmar Senha'
                secureTextEntry
                onChangeText={(txt) => setConfirmarSenha(txt)}
                value={confirmarSenha}
                labelStyle={{color : '#FFF'}}
                style={{backgroundColor : '#FFF', borderRadius : 10}}
                />


                <View style={{flex : 1, flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center'}}>
                    <Button 
                    onPress={() => props.navigation.reset({
                        index:1,
                        routes:[{name:'home'}]
                    }) }
                    buttonStyle={{width: 110, height: 55, backgroundColor : '#393E41'}}
                    title='Voltar' />
                    
                    <Button 
                    onPress={() => {validate()}}
                    buttonStyle={{width: 110, height: 55, backgroundColor : '#B18FCF'}}
                    title='Salvar' />
                    
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default UserRegister