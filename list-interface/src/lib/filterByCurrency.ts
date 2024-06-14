
export function filterByCurrency(data: any[], currencyKey: string, currencyValue: string): any[] {
    return data.filter(item => item[currencyKey] === currencyValue);
}