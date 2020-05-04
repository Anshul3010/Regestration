class ApiFeatures {
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        const queryObj = {...this.queryString};
        const excluded = ['page','limit','sort','feilds'];
        excluded.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(get|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
}

module.exports = ApiFeatures;