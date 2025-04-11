import Toast from 'react-native-toast-message';

export function showToastError(message: string) {
  Toast.show({
    type: 'error',
    text1: 'Erro',
    text2: message,
    position: 'bottom',
  });
}
export function showToastSuccess(message: string) {
  Toast.show({
    type: 'success',
    text1: 'Sucesso',
    text2: message,
    position: 'bottom',
  });
}
export function showToastInfo(message: string) {
  Toast.show({
    type: 'info',
    text1: 'Info',
    text2: message,
    position: 'bottom',
  });
}
export function showToastWarning(message: string) {
  Toast.show({
    type: 'warning',
    text1: 'Atenção',
    text2: message,
    position: 'bottom',
  });
}
