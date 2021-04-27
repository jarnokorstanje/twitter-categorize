import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    Handle: String,
});

export default mongoose.model('Accounts', accountSchema);