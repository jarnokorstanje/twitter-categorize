import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  Title: String,
  Accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accounts',
    },
  ],
});

export default mongoose.model('Category', categorySchema);