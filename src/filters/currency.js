export default {
    currencyUSD(num) {
        const n = Number(num);
        if(num){
            return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
            const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
            return currency;
            })}`;
        }else{
            return `$0`
        }
    },
    test(num) {
        const n = Number(num);
        return `&&${num}`
    }
}