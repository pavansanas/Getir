const dal = require("../dal/record_dal");

/**
 * typedef {Object} Records
 * Property {String} key: record key
 * Property {Date} createdAt: created date
 * Property {Number} totalCount: Sum of counts
 */
/**
 *
 * @param {*} startDate Start Date
 * @param {*} endDate End Date
 * @param {*} minCount Min Count
 * @param {*} maxCount Max Counr
 * @returns {Records} records array of records
 */
const getRecord = async (startDate, endDate, minCount, maxCount) => {
  const records = await dal.getRecord(startDate, endDate, minCount, maxCount);
  const recordObjects = records.map((dalObject) => {
    return {
      key: dalObject.key,
      createdAt: dalObject.createdAt,
      totalCount: dalObject.totalCount,
    };
  });

  return recordObjects;
};
module.exports = { getRecord };
