"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIFeatures {
    // ~ Data type
    // ~ constructor (Data)
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    // ~ constructor (Data)
    // ~ Methods (Logic)
    // & Filters the query based on the client's query parameters, excluding pagination and sorting parameters.
    filter() {
        const queryObj = Object.assign({}, this.queryString);
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    // & Filters the query based on the client's query parameters, excluding pagination and sorting parameters.
    // & Sorts the query based on the sort field provided by the client.
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }
    // & Sorts the query based on the sort field provided by the client.
    // & Limits the fields returned in the query based on the fields parameter provided by the client.
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select("-__v");
        }
        return this;
    }
    // & Limits the fields returned in the query based on the fields parameter provided by the client.
    // & Implements pagination by skipping and limiting the number of documents returned.
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
// ~ Methods (Logic)
exports.default = APIFeatures;
