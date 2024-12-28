export const declOfNum = (n: number, titles: string[]) => {
    let cases = [2, 0, 1, 1, 1, 2]
    return titles[
        n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]
    ]
}
export const formatThousand = (number: any) =>
    String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
export const phoneReplace = (value: any) => value.replace(/[^\d+]/g, '')
export const ruble = (value: any) => `${formatThousand(decimal(value))} ₽`
export const decimal = (value: any) =>
    value % 1 !== 0 ? parseFloat(value).toFixed(1) : value
