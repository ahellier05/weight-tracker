const { SQLDataSource } = require('datasource-sql');

const MINUTE=60;

class PostGresDataSource extends SQLDataSource {

    /**
     * Gets metrics by search of weight
     */
    
    getMetricsByWeight(args) {
        return this.knex
            .select()
            .from('metrics')
            .where('weight', args.weight)
            .then (r => {
                return r;
            })
            .catch(e => {
                throw e;
            });
    }

     /**
      * Gets metrics by search of user_id
      */

     getMetricsByID(args) {
         return this.knex
            .select()
            .from('metrics')
            .where('user_id', args.user_id)
            .then (r => {
                return r;
            })
            .catch(e => {
                throw e;
            });
     }

     /**
      * Get all metrics
      */
     getAllMetrics() {
         return this.knex
            .select()
            .from('metrics')
            .orderBy('user_id')
            .then (rows => {
                return rows;
            })
            .catch(e => {
                throw e;
            });
     }

    

};

module.exports = PostGresDataSource;