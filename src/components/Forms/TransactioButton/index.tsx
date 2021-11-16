import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Button, Container, Icon, Title } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface Props extends RectButtonProps {
  title: string;
  type: 'up' | 'down';
  isActived: boolean;
}

export function TransactionButton({title, type, isActived, ...rest}: Props) {
  return (
    <Container
      type={type} 
      isActived={isActived} 
    >
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  )
}