import React from 'react'
import {
    Image,
    StyleSheet
} from 'react-native'

import logo from './saveFood.png'

const Header = () => {
    return (
        <Image 
            source={logo} 
            style={styles.imageStyle}
        />
    )
}

const styles = StyleSheet.create({
    imageStyle:{
        width: 100,
        height: 100,
        marginTop: 8,
        marginLeft: 8
        
    }
})

export default Header