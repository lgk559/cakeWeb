export default {
    getData(timestamp) {
        var date = new Date(timestamp * 1000);
        const year = date.getFullYear()
        const month  = date.getMonth() + 1
        const day  = date.getDate()
        return `${year}/${month}/${day}`
    },
}