const mongoose = require("mongoose")

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL), {
            poolSize: 10, // Số lượng kết nối tối đa trong pool
            serverSelectionTimeoutMS: 5000, // Timeout để chọn server (ms)
            socketTimeoutMS: 45000, // Timeout socket (ms)
        };
        console.log("Connect Success!");
    } catch (error) {
        console.error("Connect Error:", error.message);
    }
    
}


