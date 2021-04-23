import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    Title: String,
});

export default mongoose.model('Accounts', accountSchema);