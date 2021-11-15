import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  isActived: boolean;
  type: 'up' | 'down';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ isActived }) => isActived ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.text};
  border-radius: ${RFValue(8)}px;

  padding: ${RFValue(16)}px;

  ${({theme, isActived, type}) => isActived && css`
    background-color: ${type === 'up' 
      ? theme.colors.success_light 
      : theme.colors.attention_light};
  `}
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