import React from 'react'

import Header from './src/components/Header'
import UserRegister from './src/components/screens/UserRegister'
import ProductRegister from './src/components/screens/ProductRegister'
import Login from './src/components/screens/Login'
import Home from './src/components/screens/Home'
import ListAll from './src/components/screens/ListAll'
import UpdateProduct from './src/components/screens/UpdateProduct'
import ListExpired from './src/components/screens/ListExpired'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'


const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name='userRegister' component={UserRegister} options={{title:'Cadastro de Usuário'}} />
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name='productRegister' component={ProductRegister} options={{title:'Cadastro de Produto'}} />
        <Stack.Screen name="listAll" component={ListAll} options={{title: 'Produtos Disponíveis',headerBackVisible: false}}/>
        <Stack.Screen name="listExpired" component={ListExpired} options={{title: 'Produtos Vencidos'}}/>
        <Stack.Screen name='updateProduct' component={UpdateProduct} options={{title:'Atualizar Produto'}} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App