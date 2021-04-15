const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
    { 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    }).then(() => console.log('MongoDB connection successful')).catch((err) => console.log('MongoDB connection error! Error:', err))