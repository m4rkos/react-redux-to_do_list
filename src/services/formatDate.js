export const pad = (num) =>{
    return ("0" + num).slice(-2);
}
export const FormatShortTime = (timestamp) =>{
    var date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return pad(hours) + ":" + pad(minutes)
}