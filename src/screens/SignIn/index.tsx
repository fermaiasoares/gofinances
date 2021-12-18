import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from './styles';

import AppleLogo from '../../assets/apple.svg';
import GoogleLogo from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SingInSocialButton } from '../../components/SingInSocialButton/index';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { Alert, Platform, ActivityIndicator } from 'react-native';

export function SignIn() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Não possível conectar a conta Google');
    }
  }

  async function handleSignInApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Não possível conectar a conta Google');
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SingInSocialButton 
            svg={GoogleLogo} 
            title="Entrar com Google" 
            onPress={handleSignInGoogle}
          />

          { Platform.OS === 'ios' &&
            <SingInSocialButton 
              svg={AppleLogo} 
              title="Entrar com Apple" 
              onPress={handleSignInApple}
            />
          }
        </FooterWrapper>

        { isLoading && <ActivityIndicator color={theme.colors.shape} size='large' />}
      </Footer>
    </Container>
  );
}