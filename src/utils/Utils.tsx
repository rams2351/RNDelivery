import Toast from 'react-native-toast-message';

export const _showSuccessMessage = (msg: string) => {
    Toast.show({
        type: 'success',
        text1: msg
    })
}

export const _showErrorMessage = (msg: string) => {
    Toast.show({
        type: 'error',
        text1: msg
    })
}

export const _showInfoMessage = (msg: string) => {
    Toast.show({
        type: 'info',
        text1: msg
    })
}

export function DateFormatter(inputDate: string | Date) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
}

