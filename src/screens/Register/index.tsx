import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import * as yup from "yup";

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { 
  Container, 
  Fields, 
  Form, 
  Title, 
  Header, 
  TransactionsTypes 
} from './styles';

import { Button } from '../../components/Forms/Button';
import { TransactionButton } from '../../components/Forms/TransactioButton';
import { Select } from '../../components/Forms/Select';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';
import { useAuth } from '../../hooks/auth';

interface FormData {
  name: string;
  amount: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório.'),
  amount: yup.number()
    .typeError('Informe um valor numérico.')
    .positive('Apenas valores positivos.')
    .required('Valor é obrigatório.'),
});

export function Register() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'any'
  });
  const [transactionType, setTransactionType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setModalVisible(false);
  }

  function handleOpenSelectCategoryModal() {
    setModalVisible(true);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) 
      return Alert.alert('Selecione o tipo de transação');

    if (category.key === 'category')
      return Alert.alert('Selecione uma categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const transactions = await AsyncStorage.getItem(dataKey);

      const currentTransaction = transactions ? JSON.parse(transactions) : [];

      const newCurrentTransaction = [
        ...currentTransaction,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(newCurrentTransaction));

      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
        icon: 'any'
      });
      reset();

      navigation.navigate('Listagem');
    } catch (error) {
      Alert.alert('Erro ao tentar registra a transação');
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
            control={control}
            name="name"
            placeholder="Nome"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
            />

          <InputForm
            control={control}
            name="amount"
            placeholder="Preço"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
            />

          <TransactionsTypes>
            <TransactionButton 
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('positive')}
              isActived={transactionType === 'positive'}
              />

            <TransactionButton 
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('negative')}
              isActived={transactionType === 'negative'}
              />
          </TransactionsTypes>

          <Select 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button 
          title="Enviar"
          onPress={handleSubmit(handleRegister)}
        />
      </Form>

      <Modal visible={modalVisible}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
          />
      </Modal>

    </Container>
    </TouchableWithoutFeedback>
  );
}