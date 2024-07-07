import { formatDistanceToNowStrict } from 'date-fns';

export function jobPostedTime(date: Date) {
    let timeDifference = new Date().getTime() - date.getTime();

    let secondsDifference = Math.floor(timeDifference / 1000);
    let minutesDifference = Math.floor(secondsDifference / 60);
    let hoursDifference = Math.floor(minutesDifference / 60);
    let daysDifference = Math.floor(hoursDifference / 24);
    let monthsDifference = Math.floor(daysDifference / 30);
    let yearsDifference = Math.floor(monthsDifference / 12);

    if (yearsDifference > 0) {
        return (
            yearsDifference +
            (yearsDifference === 1 ? ' year ago' : ' years ago')
        );
    } else if (monthsDifference > 0) {
        return (
            monthsDifference +
            (monthsDifference === 1 ? ' month ago' : ' months ago')
        );
    } else if (daysDifference > 0) {
        return (
            daysDifference + (daysDifference === 1 ? ' day ago' : ' days ago')
        );
    } else if (hoursDifference > 0) {
        return (
            hoursDifference +
            (hoursDifference === 1 ? ' hour ago' : ' hours ago')
        );
    } else if (minutesDifference > 0) {
        return (
            minutesDifference +
            (minutesDifference === 1 ? ' minute ago' : ' minutes ago')
        );
    } else {
        return ' Just now';
    }
}

export function relativeDate(from: Date) {
    return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function formatMoney(amount: number) {
    return new Intl.NumberFormat('fr-CM', {
        style: 'currency',
        currency: 'XAF',
    }).format(amount);
}
