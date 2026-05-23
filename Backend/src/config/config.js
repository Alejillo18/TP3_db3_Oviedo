import dotenv from "dotenv";
import { MongoClient } from 'mongodb';

dotenv.config();


const client = new MongoClient(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log(" Conexión exitosa a la base de datos");
    return client.db("Electrodomesticos"); 
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};


export default connectDB