module.exports.generateRandomString = (length) => {
    let result = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++){
        result += characters[Math.floor(Math.random() * characters.length)]
    }
    
    return result;
}

module.exports.generateRandomNumber = (length) => {
    const characters = "1234567890";
    let result = "";

    while (length--){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}