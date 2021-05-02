import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  userId: String,
  title: String,
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accounts',
    },
  ],
});

export default mongoose.model('Category', categorySchema);