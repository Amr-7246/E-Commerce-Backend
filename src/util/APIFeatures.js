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
        const queryObj = { ...this.queryString };
        const excludeFields = ["page", "sort", "limit", "fields"]; // Fields to exclude from the filter
        // Remove excluded fields from the query object
        excludeFields.forEach((el) => delete queryObj[el]);
        // Convert query object to string to prepare for adding MongoDB operators
        let queryStr = JSON.stringify(queryObj);
        // Replace comparison operators (gte, gt, lte, lt) with MongoDB operators ($gte, $gt, etc.)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        // Apply the modified query object to the Mongoose query
        this.query = this.query.find(JSON.parse(queryStr));
        return this; // Return the instance for method chaining
    }
    // & Filters the query based on the client's query parameters, excluding pagination and sorting parameters.
    // & Sorts the query based on the sort field provided by the client.
    sort() {
        if (this.queryString.sort) {
            // Convert comma-separated sort fields into space-separated fields for Mongoose
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy); // Apply sorting
        }
        else {
            // Default sort by creation date in descending order
            this.query = this.query.sort("-createdAt");
        }
        return this; // Return the instance for method chaining
    }
    // & Sorts the query based on the sort field provided by the client.
    // & Limits the fields returned in the query based on the fields parameter provided by the client.
    limitFields() {
        if (this.queryString.fields) {
            // Convert comma-separated fields into space-separated fields for Mongoose
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields); // Apply field selection
        }
        else {
            // Exclude the internal __v field by default
            this.query = this.query.select("-__v");
        }
        return this; // Return the instance for method chaining
    }
    // & Limits the fields returned in the query based on the fields parameter provided by the client.
    // & Implements pagination by skipping and limiting the number of documents returned.
    paginate() {
        const page = this.queryString.page * 1 || 1; // Current page, default to 1
        const limit = this.queryString.limit * 1 || 100; // Documents per page, default to 100
        const skip = (page - 1) * limit; // Calculate number of documents to skip
        // Apply skip and limit to the Mongoose query
        this.query = this.query.skip(skip).limit(limit);
        return this; // Return the instance for method chaining
    }
}
// ~ Methods (Logic)
exports.default = APIFeatures;
/* Why find().find() Doesn't Execute Twice
When you call .find() on an existing query object, Mongoose interprets this as adding additional conditions to the query.
It does not execute the first .find() call; instead, it merges the conditions into a single query. */
