import React from 'react';

import { Container, Icon, Title} from './styles';

interface Props {
  title?: string;
  onPress: () => void;
}

export function Select({ title = 'Selecione', onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
      <Icon name="chevron-down" />
    </Container>
  )
}