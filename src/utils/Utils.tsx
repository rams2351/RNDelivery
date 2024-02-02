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


export function TimeFormatter(time: number | string) {
    if (typeof time !== 'number' || isNaN(time) || time < 0) {
        return 'Invalid input';
    }

    const totalSeconds = Math.floor(time * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutesPart = Math.floor(remainingSeconds / 60);
    const secondsPart = remainingSeconds % 60;

    let formattedTime = `${padZero(minutesPart)} mins`;

    if (hours > 0) {
        formattedTime = `${padZero(hours)}:${formattedTime}`;
    }

    return formattedTime;
}

export function AddMinutesToTime(timeString: String, minutesToAdd: number) {
    const format = /^(\d{1,2}):(\d{2}):(\d{2}) ([APMapm]{2})$/;
    const match = timeString.match(format);

    if (!match) {
        return 'Invalid time format';
    }

    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = parseInt(match[3], 10);
    const period = match[4].toUpperCase();

    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60) % 12 || 12;
    const newMinutes = totalMinutes % 60;

    const newTimeString = `${padZero(newHours)}:${padZero(newMinutes)}:${padZero(seconds)} ${period}`;

    return newTimeString;
}

export function GetCurrentTime() {
    const now = new Date();
    const options = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
    //@ts-ignore
    const formattedTime = now.toLocaleTimeString(undefined, options);
    return formattedTime;
}

function padZero(value: number) {
    return value < 10 ? `0${value}` : value;
}


