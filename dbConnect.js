import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the app if the database connection fails
    }
};

export default dbConnect;
