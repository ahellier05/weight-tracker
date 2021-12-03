const { SQLDataSource } = require("datasource-sql");

const MINUTE = 60;

class PostGresDataSource extends SQLDataSource {
  /**
   * Gets metrics by search of weight
   */

  getMetricsByWeight(args) {
    return this.knex
      .select()
      .from("metrics")
      .where("weight", args.weight)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        throw e;
      });
  }

  /**
   * Gets metrics by search of user_id
   */

  getMetricsByID(args) {
    return this.knex
      .select()
      .from("metrics")
      .where("user_id", args.user_id)
      .then((r) => {
        return r;
      })
      .catch((e) => {
        throw e;
      });
  }

  /**
   * Get all metrics
   */
  getAllMetrics() {
    return this.knex
      .select()
      .from("metrics")
      .orderBy("user_id")
      .then((rows) => {
        return rows;
      })
      .catch((e) => {
        throw e;
      });
  }

  /**
   * Creates a new metric entry into the db
   * @param {weight, entry_date, user_id}
   * @returns a new entry of type metric
   */
  createMetricEntry(args) {
    return this.knex
      .insert({
        weight: args.weight,
        entry_date: args.entry_date,
        user_id: args.user_id,
      })
      .into("metrics")
      .returning("id")
      .then((id) => {
        console.log("Recording new metric...");
        return id;
      })
      .catch((e) => {
        throw e;
      });
  }
}

module.exports = PostGresDataSource;
