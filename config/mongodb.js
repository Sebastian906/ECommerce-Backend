import mongoose from 'mongoose';

const dbConfig = {
    name: 'mongodb',
    connector: 'mongodb',
    url: process.env.MONGO_URI,
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
    database: process.env.MONGO_DATABASE,
};

const connectDB = async () => {
    console.log("Hello123")
    try {
        console.log(dbConfig)
        await mongoose.connect(dbConfig.url, {
            useNewUrlParser: dbConfig.useNewUrlParser,
            useUnifiedTopology: dbConfig.useUnifiedTopology,
            user: dbConfig.user,
            pass: dbConfig.password,
            dbName: dbConfig.database
        });
        console.log(`MongoDB conectado: ${dbConfig.database} en ${dbConfig.host}:${dbConfig.port}`);
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error.message);
        process.exit(1); // Salir del proceso si hay un error de conexión
    }
};

export default connectDB;