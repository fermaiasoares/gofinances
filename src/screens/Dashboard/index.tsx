import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container,
  Header,
  HighlightCards,
  Icon,
  Photo,
  Title,
  Transactions,
  TransactionsList,
  User,
  UserGretting,
  UserInfo,
  UserName,
  UserWrapper
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de Site",
      amount: "R$ 12.000,00",
      date: "13/04/2020",
      category: {
        name: 'Vendas', 
        icon: 'dollar-sign' 
      }
    },
    {
      id: '2',
      type: 'negative',
      title: "Aluguel apartamento",
      amount: "R$ 1.200,00",
      date: "13/04/2020",
      category: {
        name: 'Casa', 
        icon: 'home' 
      }
    },
    {
      id: '3',
      type: 'negative',
      title: "Pizzaria Italiana",
      amount: "R$ 50,00",
      date: "13/04/2020",
      category: {
        name: 'Alimentação', 
        icon: 'coffee' 
      }
    }
  ];

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


      <Transactions>
        <Title>Listagem</Title>
        
        <TransactionsList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </Container>
  );
}