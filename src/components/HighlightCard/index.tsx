import React from 'react';

import { 
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransation,
} from './styles';

interface Props {
  title: string;
  type: 'up' | 'down' | 'total';
  amount: string;
  lastTransaction: string;
}

export function HighlightCard({
  title,
  type,
  amount,
  lastTransaction,
}: Props) {

  const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign',
  }

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransation type={type}>{lastTransaction}</LastTransation>
      </Footer>
    </Container>
  );
}