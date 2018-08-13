export default str => {
    const lower = str.toLowerCase();
    return [' ', '-'].reduce((res, sep) => {
        return res.split(sep).map(word => word[0].toUpperCase() + word.substr(1)).join(sep);
    }, lower);
}