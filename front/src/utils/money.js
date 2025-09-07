export function money(priceAmount){
    return `$${(priceAmount / 100).toFixed(2)}`
}