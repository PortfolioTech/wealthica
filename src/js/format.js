export function iFormatValue(value, format) {
    if (value == 0) return "";

    switch (format) {
        case 'number':
            return new Intl.NumberFormat('en-US').format(value);;
        case 'money':
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
        case 'percent':
            return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(value);
        default:
            return 'Invalid'; // You can return anything you want here
    }
}
