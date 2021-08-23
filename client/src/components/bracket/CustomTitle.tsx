import { Text } from '@chakra-ui/react'
import React from 'react'

export function renderCustomTitle(title: React.ReactNode) {
  return (
    <Text style={{ textAlign: 'center', color:'white', fontSize:'1.1em' }}>
      {title}
    </Text>
  )
}
