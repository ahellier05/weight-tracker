import APIQuery from "./APIQuery";

/**
 * Call to retrieve the weight from the database by passing in user_id
 */
const getMetrics = (userId) =>
  new Promise((resolve, reject) => {
    const postQuery = `query {\nmetrics(user_id: ${userId}) {\nweight,entry_date,user_id,\n}\n}`;
    APIQuery.query(postQuery)
      .then((r) => resolve(r))
      .catch(() => reject("Could not retrieve metrics"));
  });

const createMetrics = (weight, userId, entryDate) =>
  new Promise((resolve, reject) => {
    const postMutation = `mutation {\ncreateMetric(weight: ${weight}, entry_date:${entryDate}, user_id:${userId}) {\nid,\n}\n}`;
    APIQuery.query(postMutation)
      .then((r) => resolve(r))
      .catch(() => reject("Could not create metric"));
  });

export default { getMetrics, createMetrics };
