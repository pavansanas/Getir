const mongoose = require("mongoose");
await mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: false,
});
const Schema = mongoose.Schema;
const Records = new Schema();
Records.add({
  key: String,
  createdAt: Date,
  totalCount: Number,
});

const rootModel = new Schema({
  code: number,
  msg: String,
  records: [Records],
});
const getRecord = (startDate, endDate, minCount, maxCount) => {
  rootModel.find({}, function (err, docs) {});
};
module.exports = getRecord;
