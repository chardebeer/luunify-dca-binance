import styled from 'styled-components';
import React, { useState } from 'react';

import StyledBlueContainer from '../styles/BlueContainer.style';
import StyledExitButton from '../styles/ExitButton.style';
import StyledNextButton from '../styles/NextButton.style';
import GlobalStyles from '../styles/GlobalStyles';
import StyledButton from '../styles/Button.style';
import StyledLogo from '../styles/Logo.style';
import Link from 'next/link';
import StyledInputField from '../styles/InputField.style';

const Line = styled.hr`
  width: 35px;
  height: 8px;
  background: white;
  border: #ffffff;
  opacity: 0.5;
  display: block;
  margin: 22px auto;
  align-items: center;
`;

export default function SignupForm() {
  const typeEmail = 'email';
  const typeText = 'text';
  const typeDate = 'date';
  const typePassword = 'password';
  const typeSubmit = 'submit';
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');

  return (
    <StyledBlueContainer>
      <GlobalStyles />
      <Link href="/signin" passHref={true}>
        <a>
          <StyledExitButton />
        </a>
      </Link>
      <StyledLogo />
      <h2>READY TO AUTOMATE?</h2>
      <Line />
      <form>
        <StyledInputField id={'username'} type={typeText} placeholder={'username'} onChange={setUsername} />
        <StyledInputField id={'email'} type={typeEmail} placeholder={'email'} onChange={setEmail} />
        <StyledInputField id={'DOB'} type={typeDate} placeholder={'Birth Date'} onChange={setBirthDate} />
        <StyledInputField id={'password'} type={typePassword} placeholder={'password'} onChange={setPassword} />
        <p style={{ opacity: 0.6 }}>I agree to terms and conditions</p>
        <StyledButton buttonLabel={'Submit'} type={typeSubmit} />
      </form>
      <Link href="/newaccount" passHref={true}>
        <a>
          <StyledNextButton buttonLabel={'Next >'} />
        </a>
      </Link>
    </StyledBlueContainer>
  );
}
