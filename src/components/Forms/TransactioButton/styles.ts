import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  isActived: boolean;
  type: 'up' | 'down';
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  width: 48%;
  border-width: ${({ isActived }) => isActived ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.text};
  border-radius: ${RFValue(8)}px;

  ${({isActived, type}) => isActived && type === 'up' && css`
    background-color: ${({theme}) => theme.colors.success_light};
  `}

  ${({isActived, type}) => isActived && type === 'down' && css`
    background-color: ${({theme}) => theme.colors.attention_light};
  `}
`;

export const Button = styled(RectButton)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${RFValue(16)}px;  
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: ${RFValue(12)}px;

  color: ${({theme, type}) => type === 'up' 
    ? theme.colors.success 
    : theme.colors.attention}
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-transform: uppercase;
`;