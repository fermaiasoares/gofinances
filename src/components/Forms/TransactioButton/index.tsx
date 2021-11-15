import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface Props extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActived: boolean;
}

export function TransactionButton({title, type, isActived, ...rest}: Props) {
  return (
    <Container 
      type={type} 
      isActived={isActived} 
      {...rest}
    >
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  )
}