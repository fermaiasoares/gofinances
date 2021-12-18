import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${({ theme }) => theme.colors.primary};
  
  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.medium };
  color: ${({ theme }) => theme.colors.shape };

  margin-top: ${RFValue(45)}px;
`;

export const SignInTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular };
  color: ${({ theme }) => theme.colors.shape };

  margin-top: ${RFValue(80)}px;
  margin-top: ${RFValue(67)}px;
`;

export const Footer = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 ${RFValue(32)}px;
  justify-content: space-between;
`;