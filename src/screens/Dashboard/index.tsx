import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container,
  Header,
  HighlightCards,
  Icon,
  LogoutButton,
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

import { categories } from '../../utils/categories';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = '@gofinance:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    
    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        console.log(Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }));

        const date = new Date(item.date).toLocaleDateString('pt-BR');

        return {
          id: item.id,
          name: item.name,
          amount,
          date,
          type: item.type,
          category: item.category,
        }
      }
    );

    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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