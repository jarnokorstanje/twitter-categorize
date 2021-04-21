import mongoose from 'mongoose';

const connectionsSchema = new mongoose.Schema({
    Title: String,
});

export default mongoose.model('Connections', connectionsSchema);