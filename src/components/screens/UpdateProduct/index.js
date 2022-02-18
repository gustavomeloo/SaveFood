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

const UpdateProduct = (props) => {

    let date = new Date();
    let dateFormat = date.getFullYear()+"-"+((date.getMonth() + 1))+"-"+((date.getDate() + 1 ))
    
    const [nome, setNome] = useState(props.route.params.nome)
    const [vencimento, setVencimento] = useState(props.route.params.vencimento)
    const [quantidade, setQuantidade] = useState(props.route.params.quantidade)
    const [id, setId] = useState(props.route.params.id)

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

    const editarProduto = (nome, vencimento, quantidade, id) => {
        if(!validated()){
            return
        }
        firestore().collection(auth().currentUser.uid).doc(id).update({
          nome: nome,
          vencimento: vencimento,
          status : 'Disponivel',
          quantidade : quantidade
        })
        props.navigation.reset({
            index:0,
            routes:[{name:'listAll'}]
        }) 
      }

    return(
        <ScrollView style={{flex : 1, backgroundColor : '#56A75F', padding : 16}}>
            <SafeAreaView  >

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
                        format="YYYY-MM-DD" 
                        date={vencimento} 
                        onDateChange={(txt) => setVencimento(txt)}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        minDate={dateFormat}
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
                    onPress={()=>props.navigation.navigate('listAll')}
                    buttonStyle={{width: 110, height: 55, backgroundColor : '#393E41'}}
                    title='Voltar' />
                    
                    <Button 
                    onPress={() => editarProduto(nome, vencimento, quantidade, id)}
                    buttonStyle={{width: 110, height: 55, backgroundColor : '#E94F37'}}
                    title='Salvar' />
                    
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default UpdateProduct 