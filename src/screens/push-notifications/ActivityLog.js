import React from 'react'
import {StyleSheet} from 'react-native'
import { Container, Content, Text} from 'native-base'

import CustomHeader from '../../components/common/CustomHeader'

export default function ActivityLog() {
    return (
        <Container> 
            <CustomHeader 
                title="ActivityLog"
            />
            <Content 
                contentContainerStyle={styles.container}>
                <Text>ActivityLog</Text>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '98%',
        marginLeft: '1%'
    }
})
  