const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL);
const dbName = process.env.MANGO_DB_NAME;
const dbCollection = process.env.MANGO_COLLECTION;
const getRecord = async (startDate, endDate, minCount, maxCount) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(dbCollection);
  const pipeline = getPipeline(startDate, endDate, minCount, maxCount);
  const aggCursor = collection.aggregate(pipeline);
  const records = [];
  for await (const doc of aggCursor) {
    records.push(doc);
  }
  return records;
};

const getPipeline = (startDate, endDate, minCount, maxCount) => {
  return [
    {
      $match: {
        createdAt: {
          $gte: new Date(`${startDate} 00:00:00 GMT`),
          $lte: new Date(`${endDate} 00:00:00 GMT`),
        },
      },
    },
    {
      $addFields: {
        totalCount: {
          $reduce: {
            input: "$counts",
            initialValue: 0,
            in: {
              $add: ["$$value", "$$this"],
            },
          },
        },
      },
    },
    {
      $match: {
        totalCount: {
          $gt: minCount,
          $lte: maxCount,
        },
      },
    },
  ];
};
module.exports = { getRecord };
