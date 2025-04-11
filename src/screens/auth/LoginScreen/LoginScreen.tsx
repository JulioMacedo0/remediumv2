import React from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {loginScreenSchema, LoginScreenSchema} from './LoginScreenSchema';
import {AuthScreenProps} from '../../../routes/navigationType';
import {Screen} from '../../../components/Screen/Screen';
import {Text} from '../../../components/Text/Text';
import {FormTextInput} from '../../../components/FormTextInput/FormTextInput';
import {Button} from '../../../components/Button/Button';
import {useAuthStore} from '../../../stores/auth/authStore';

export function LoginScreen({navigation}: AuthScreenProps<'LoginScreen'>) {
  const {control, handleSubmit} = useForm<LoginScreenSchema>({
    resolver: zodResolver(loginScreenSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
  });
  const signIn = useAuthStore(s => s.signIn);
  const isLoading = useAuthStore(s => s.isLoading);
  async function submitForm(formValues: LoginScreenSchema) {
    signIn(formValues);
  }
  return (
    <Screen scrollabe>
      <Text mb="s10" preset="headingLarge" color="primary">
        Login
      </Text>

      <FormTextInput
        control={control}
        name="email"
        keyboardType="email-address"
        label="E-mail"
        placeholder="Digite seu E-mail"
        returnKeyType="next"
        boxProps={{
          mb: 's12',
        }}
      />
      <FormTextInput
        control={control}
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
        returnKeyType="done"
        isPassword
        boxProps={{
          mb: 's12',
        }}
      />

      <Text preset="paragraphSmall" color="primary" bold>
        Esqueceu a senha?
      </Text>
      <Button
        mt="s56"
        buttonVariant="fill"
        title="Entrar"
        mb="s10"
        loading={isLoading}
        //disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />

      <Button
        buttonVariant="outline"
        title="Criar conta"
        onPress={() => navigation.navigate('SignUpScreen')}
      />
    </Screen>
  );
}
