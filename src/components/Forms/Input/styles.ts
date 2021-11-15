import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TextInput`
  width: 100%;
  padding: ${RFValue(18)}px ${RFValue(16)}px;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: ${RFValue(8)}px;
  
  color: ${({ theme }) => theme.colors.text_dark};
  margin-bottom: ${RFValue(8)}px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;