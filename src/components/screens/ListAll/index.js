import React, { useState, useEffect } from 'react'
import {
    Button,
    SpeedDial,
    ListItem
} from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { 
    StyleSheet,
    View,
    FlatList,
    RefreshControl
} from 'react-native';

const ListAll = (props) => {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const deleteProduct = (id) => {
        firestore().collection(auth().currentUser.uid).doc(id).delete();
    }

    const consumed = (id) => {
        firestore().collection(auth().currentUser.uid).doc(id).update({
            status : 'Consumido',
          })
    }

    const updateStatus = () => {
        firestore()
            .collection(auth().currentUser.uid)
            .where('status','==', 'Disponivel')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    if(new Date(doc.data().vencimento) < new Date(Date.now())){
                        firestore().collection(auth().currentUser.uid).doc(doc.id).update({
                            status : 'Vencido',
                          })
                    }
                })
                getProducts(auth().currentUser.uid)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getProducts = (id) => {
        setIsLoading(true)
        firestore()
            .collection(id)
            .orderBy('vencimento','asc')
            .get()
            .then(querySnapshot => {
                const list = [];
                querySnapshot.forEach((doc) => {
                    if(doc.data().status == "Disponivel"){
                        list.push({ ...doc.data(), id: doc.id });
                    }
                })
                setProducts(list);
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        updateStatus()
      }, []);

    return(
        <View style={{flex: 1, padding : 16}} >
        <FlatList
            data={products}
            refreshControl={
                <RefreshControl
                    onRefresh={() => updateStatus() }
                    refreshing={ isLoading }
                />}
            renderItem={({ item }) => (
                <View style={{paddingBottom : 10}} >
                    <ListItem.Swipeable
                        leftContent={
                            <Button
                            onPress={ () => {
                                consumed(item.id)
                                getProducts(auth().currentUser.uid)
                            }}
                            title="Consumido"
                            icon={{ name: 'check', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'lightgreen' }}
                            />
                        }
                        rightContent={
                            <View style={{display: 'flex', flexDirection: 'row'}} >
                            <Button
                            onPress={ () => props.navigation.navigate('updateProduct', {
                                id : item.id,
                                nome : item.nome,
                                vencimento : item.vencimento,
                                quantidade : item.quantidade
                            })
                        }
                            icon={{ name: 'edit', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'orange', width: 65 }}
                            />

                            <Button
                            onPress={ () => {
                                deleteProduct(item.id)
                                getProducts(auth().currentUser.uid)
                            }}
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red', width: 65 }}
                            />
                            </View>
                        }
                        >
                        <ListItem.Content>
                            <View style={{flex: 1}} >
                            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                                    <ListItem.Title style={styles.itemStyle}>{item.nome}</ListItem.Title>
                                    <ListItem.Title style={styles.itemStyle}>{item.quantidade}</ListItem.Title>   
                                </View>
                                <View style={{flexDirection: 'row', justifyContent:'space-between',alignItems:'center', marginTop: 32}}>
                                    <ListItem.Title style={styles.dataItemStyle}>{item.vencimento}</ListItem.Title>
                                    <ListItem.Title style={styles.statusItemStyle}>{item.status}</ListItem.Title>
                                </View>
                            </View>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem.Swipeable>

                </View>
            )}
        />

            <SpeedDial
            color='#EB705B'

            isOpen={open}
            icon={{ name: 'edit', color: '#fff' }}
            openIcon={{ name: 'close', color: '#fff' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            >
            <SpeedDial.Action
                color='#EB705B'
                icon={{ name: 'add', color: '#fff' }}
                title="Cadastrar Produto"

                onPress={() =>  props.navigation.navigate('productRegister')}
            />
            <SpeedDial.Action
                color='#EB705B'
                icon={{ name: 'list', color: '#fff' }}
                title="Produtos Vencidos"
                onPress={() => props.navigation.reset({
                    index:0,
                    routes:[{name:'listExpired'}]
                }) }
            />

            <SpeedDial.Action
                color='#EB705B'
                icon={{ name: 'logout', color: '#fff' }}
                title="Sair"
                onPress={() => auth().signOut().then(() => props.navigation.navigate('home'))}
            />
            </SpeedDial>
        </View>
    )
}

const styles = StyleSheet.create({
    itemStyle:{
        fontFamily:'PatrickHand-Regular',
        fontSize:24
        
    },

    dataItemStyle:{
        fontFamily:'PatrickHand-Regular',
        fontSize:20,
    },

    statusItemStyle:{
        fontFamily:'PatrickHand-Regular',
        fontSize:24,
        color:"#56A75F", 
        marginLeft:120
    },


})

export default ListAll
