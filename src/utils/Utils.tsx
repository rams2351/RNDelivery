import { Toast } from "react-native-toast-notifications"

export const _showSuccessMessage = (msg: string | JSX.Element) => {
    Toast.show(msg, { type: 'success' })
}

export const _showErrorMessage = (msg: string | JSX.Element) => {
    Toast.show(msg, { type: 'danger' })
}

export const _showInfoMessage = (msg: string | JSX.Element) => {
    Toast.show(msg)
}

export function DateFormatter(inputDate: string | Date) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
}


export const CurrencyFormatter = (price: string | number) => {
    let curr = new Intl.NumberFormat('en-INR', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    })
    let newCurr = price
    if (typeof (price) === 'string') {
        newCurr = parseInt(price)
    }

    return curr.format(newCurr as number) ?? newCurr
}

export const NameFormatter = (name: string) => {
    let newStr = name[0].toUpperCase()
    return newStr + name.slice(1)
}


export function getCurrentDateTime() {
    const now = new Date();

    // Get the date
    const date = now.toLocaleDateString(); // Format: MM/DD/YYYY

    // Get the time
    const time = now.toLocaleTimeString(); // Format: HH:MM:SS

    // Get the day
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = daysOfWeek[now.getDay()]; // GetDay returns 0 for Sunday, 1 for Monday, and so on.

    return { date, time, day };
}