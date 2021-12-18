import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from './styles';

import AppleLogo from '../../assets/apple.svg';
import GoogleLogo from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SingInSocialButton } from '../../components/SingInSocialButton/index';

export function SignIn() {
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
          />

          <SingInSocialButton 
            svg={AppleLogo} 
            title="Entrar com Apple" 
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}