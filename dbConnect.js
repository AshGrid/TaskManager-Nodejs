import mongoose from 'mongoose';


mongoose.connect('mongodb://127.0.0.1:27017/userdb')

//mongoose.connect('mongodb://localhost:27017/flutter');

const connection = mongoose.connection;

connection.on('error', (err) => console.log(err));
connection.on('connected', () => console.log('Connection successful'));

export default connection;