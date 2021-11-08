import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';

import { 
  Container,
  Header,
  HighlightCards,
  Icon,
  Photo,
  User,
  UserGretting,
  UserInfo,
  UserName,
  UserWrapper
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/fermaiasoares.png' }}/>
            <User>
              <UserGretting>Olá</UserGretting>
              <UserName>Fernando Maia</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards >
        <HighlightCard 
          type="up"
          title="Entrada" 
          lastTransaction="Última entrada dia 13 de abril" 
          amount="R$ 17.400,00"/>     
        <HighlightCard
          type="down"
          title="Saída" 
          lastTransaction="Última saída dia 03 de abril" 
          amount="R$ 1.259,00"/>
        <HighlightCard
          type="total"
          title="Total"
          lastTransaction="01 à 16 de abril"
          amount="R$ 16.141,00"
        />
      </HighlightCards>
    </Container>
  );
}