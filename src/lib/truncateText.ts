export function truncateAtLastSpace(
    str: string,
    length: number,
    ending = '...'
) {
    if (str.length <= length) return str;
    let trimmedString = str.slice(0, length + 1);
    return (
        trimmedString.slice(
            0,
            Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
        ) + ending
    );
}
