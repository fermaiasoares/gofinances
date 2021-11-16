import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

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

interface FormData {
  name: string;
  amount: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório.'),
  amount: yup.number()
    .typeError('Informe um valor numérico.')
    .positive('Apenas valores positivos.'),
});

export function Register() {

  const {
    handleSubmit,
    control,
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

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setModalVisible(false);
  }

  function handleOpenSelectCategoryModal() {
    setModalVisible(true);
  }

  function handleRegister(form: FormData) {
    if (!transactionType) 
      return Alert.alert('Selecione o tipo de transação');

    if (category.key === 'category')
      return Alert.alert('Selecione uma categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
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