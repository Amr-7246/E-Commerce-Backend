"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, requires: true },
    itemId: { type: mongoose_1.Schema.Types.ObjectId, requires: true },
    itemType: { type: mongoose_1.Schema.Types.ObjectId, enum: ['package', 'property'], requires: true },
    status: { type: String, enum: ['initiated', 'reserved', 'paid', 'cancelled'], requires: true },
    startDate: { type: String, requires: true },
    endDate: { type: String, requires: true },
    totalPrice: { type: Number, requires: true },
    paymentId: { type: mongoose_1.Schema.Types.ObjectId, requires: true },
    createdAt: { type: String, requires: true },
    updatedAt: { type: String, requires: true },
});
exports.BookingModel = (0, mongoose_1.model)('Booking', BookingSchema);
