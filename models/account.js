import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    handle: String,
});

export default mongoose.model('Accounts', accountSchema);