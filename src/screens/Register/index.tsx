import React, { useState } from 'react';

import { Modal } from 'react-native';

import { 
  Container, 
  Fields, 
  Form, 
  Title, 
  Header, 
  TransactionsTypes 
} from './styles';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionButton } from '../../components/Forms/TransactioButton';
import { Select } from '../../components/Forms/Select';
import { CategorySelect } from '../CategorySelect';

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'any'
  });
  const [transactionType, setTransactionType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setModalVisible(false);
  }

  function handleOpenSelectCategoryModal() {
    setModalVisible(true);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input 
            placeholder="Nome"
          />

          <Input 
            placeholder="Preco"
          />

          <TransactionsTypes>
            <TransactionButton 
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
              isActived={transactionType === 'up'}
            />

            <TransactionButton 
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
              isActived={transactionType === 'down'}
            />
          </TransactionsTypes>

          <Select 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar"/>
      </Form>

      <Modal visible={modalVisible}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>

    </Container>
  );
}