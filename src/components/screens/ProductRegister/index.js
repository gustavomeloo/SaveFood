import React, {useState, useEffect} from 'react'

import {
    Alert,
    ScrollView,
    SafeAreaView,
    Text,
    View,
    LogBox 

} from 'react-native'

import {
    Button,
    Input
} from 'react-native-elements'

import Header from '../../Header'

import DatePicker from 'react-native-datepicker'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

LogBox.ignoreAllLogs()

const ProductRegister = (props) => {

    let date = new Date();
    let dateFormat = ((date.getDate() + 1 )) + "-" + ((date.getMonth() + 1)) + "-" + date.getFullYear();
    
    const [nome, setNome] = useState('')
    const [vencimento, setVencimento] = useState(dateFormat)
    const [quantidade, setQuantidade] = useState('')

    const validated = () => {
        if(nome.trim().length === 0){
            Alert.alert('Nome é obrigatório')
            return false
        }
        const quantityRegex = /^\d{1,2}$/
        if(!quantityRegex.test(quantidade) || quantidade.trim().length === 0){
            Alert.alert('A quantidade é obrigatória e só pode ter no máximo 2 números')
            return false
        }

        return true

    }

    const addProduto = () => {
        if(!validated()){
            return
        }
        var parts =vencimento.split('-')
        var date = parts[2]+'-'+parts[1]+'-'+parts[0]
        firestore().collection(auth().currentUser.uid).add({
          nome: nome,
          vencimento: date,
          status : 'Disponivel',
          quantidade : quantidade
        }).then(() => {
            Alert.alert('Produto Cadastrado')
            setNome('')
            setVencimento(dateFormat)
            setQuantidade('')
            props.navigation.navigate('productRegister')
        }).catch((error) => {
            Alert.alert('Ocorreu um erro ao cadastrar')
        })
      }

    return(
        <ScrollView style={{flex : 1, backgroundColor : '#56A75F', padding : 16}}>
            <SafeAreaView>

                <Header/>

                <Input label='Nome' labelStyle={{color : '#FFF', paddingTop : 20}} onChangeText={(txt) => setNome(txt)} value={nome}
                style={{backgroundColor : '#FFF', borderRadius : 10}} inputStyle={{textAlign:'center'}}
                />

                <View style={{flexDirection:'row', alignItems:'baseline', marginBottom: 16, width:'100%'}}>

                    <Input 
                        keyboardType='numeric'
                        label='Qtd' 
                        labelStyle={{color : '#FFF'}} 
                        onChangeText={(txt) => setQuantidade(txt)} 
                        value={quantidade}
                        containerStyle={{width:'30%'}}
                        inputStyle={{textAlign:'center'}}
                        style={{backgroundColor : '#FFF', borderRadius : 10}}
                        
                    />

                    <View>
                        <Text style={{fontWeight: 'bold', color : '#fff', fontSize : 16, marginBottom: 4}} >Vencimento</Text>

                        <DatePicker 
                        mode="date"
                        format="DD-MM-YYYY" 
                        date={vencimento} 
                        onDateChange={(txt) => setVencimento(txt)}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        minDate={vencimento}
                        style={{width:'260%'}}


                        customStyles={{
                            dateIcon: {
                            //display: 'none',
                            left: 0,
                            top: 1,
                            marginLeft: 3,
                            },
                            dateInput: {
                            backgroundColor : '#FFF',
                            borderRadius : 10,
                            height: '125%'
                            },
                        }}
                        />
                    </View>

                </View>



                <View style={{flex : 1, flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center'}}>
                    <Button 
                    onPress={() => props.navigation.reset({
                        index:0,
                        routes:[{name:'listAll'}]
                    }) }
                    buttonStyle={{width: 110, height: 55, backgroundColor : '#393E41'}}
                    title='Voltar' 
                    />
                    
                    <Button 
                    onPress={addProduto}
                    buttonStyle={{width: 110, height: 55, backgroundColor : '#E94F37'}}
                    title='Salvar' />
                    
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default ProductRegister 