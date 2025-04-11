import React from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {signUpScreenSchema, SignUpScreenSchema} from './SignUpScreenSchema';
import {Screen} from '../../../components/Screen/Screen';
import {FormTextInput} from '../../../components/FormTextInput/FormTextInput';
import {Button} from '../../../components/Button/Button';
import {AuthScreenProps} from '../../../routes/navigationType';
import {useAuthStore} from '../../../stores/auth/authStore';

export function SignUpScreen({navigation}: AuthScreenProps<'SignUpScreen'>) {
  const {control, handleSubmit} = useForm<SignUpScreenSchema>({
    resolver: zodResolver(signUpScreenSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const signUp = useAuthStore(state => state.signUp);
  const isLoading = useAuthStore(state => state.isLoading);
  const closePage = () => {
    navigation.goBack();
  };
  function submitForm(formValues: SignUpScreenSchema) {
    signUp(formValues, closePage);
  }

  return (
    <Screen title="Registrar" canGoBack scrollabe>
      <FormTextInput
        control={control}
        name="username"
        label="Digite seu usarname"
        placeholder="@"
        boxProps={{mb: 's10'}}
      />
      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu E-mail"
        boxProps={{mb: 's10'}}
      />
      <FormTextInput
        control={control}
        name="password"
        isPassword
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{mb: 's20'}}
      />

      <Button
        loading={isLoading}
        buttonVariant="fill"
        title="Criar conta"
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
