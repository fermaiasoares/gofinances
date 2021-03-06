import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container,
  Header,
  HighlightCards,
  Icon,
  LoadContainer,
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
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction?: string;
}
interface HighlightData {
  entries: HighlightProps,
  expense: HighlightProps,
  total: HighlightProps
}

export function Dashboard() {
  const {user, signOut} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = 
      Math.max.apply(Math, collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime()));
    
    if(lastTransaction > -Infinity) {
      const lastTransactionDate = new Date(lastTransaction);

      return `${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString('default', { month: 'long' })}`;
    } else {
      return null;
    }
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);

    const currentTransactions = !!response ? JSON.parse(response) : [];

    let entriesSum = 0;
    let expensesSum = 0;
    
    const transactionsFormatted: DataListProps[] = currentTransactions.map(
      (item: DataListProps) => {

        if(item.type === 'positive') {
          entriesSum += Number(item.amount);
        } else {
          expensesSum += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

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

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(currentTransactions, 'positive');
    const lastTransactionExpenses = getLastTransactionDate(currentTransactions, 'negative');

    setHighlightData({
      entries: {
        amount: entriesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: !!lastTransactionEntries ? `??ltima entrada dia ${lastTransactionEntries}` : ''
      },
      expense: {
        amount: expensesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: !!lastTransactionExpenses ? `??ltima sa??da dia ${lastTransactionExpenses}` : ''
      },
      total: {
        amount: (entriesSum - expensesSum).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })
    setIsLoading(false);
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('N??o foi poss??vel realizar o logout');
    }
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
    { isLoading 
      ?
      <LoadContainer>
        <ActivityIndicator 
          color={theme.colors.primary}
          size="large"
        />
      </LoadContainer> 
      : 
      <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: user.photo }}/>
              <User>
                <UserGretting>Ol??</UserGretting>
                <UserName>{user.name}</UserName>
              </User>
            </UserInfo>
            <LogoutButton onPress={handleSignOut}>
              <Icon name="power" />
            </LogoutButton>
          </UserWrapper>
        </Header>

        <HighlightCards >
          <HighlightCard 
            type="up"
            title="Entrada" 
            lastTransaction={highlightData.entries.lastTransaction!}
            amount={highlightData.entries.amount} />     
          <HighlightCard
            type="down"
            title="Sa??da" 
            lastTransaction={highlightData.expense.lastTransaction!}
            amount={highlightData.expense.amount} />
          <HighlightCard
            type="total"
            title="Total"
            lastTransaction=""
            amount={highlightData.total.amount} />
        </HighlightCards>


        <Transactions>
          <Title>Listagem</Title>
          
          <TransactionsList 
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />

        </Transactions>
      </>
    }
    </Container>
  );
}