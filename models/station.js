import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Title: String,
  Connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Connections',
    },
  ],
});

export default mongoose.model('Station', stationSchema);