"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBooking = exports.deleteBooking = exports.getAllBookings = exports.getBooking = exports.createBooking = void 0;
const factory_1 = require("../../utils/factory");
const bookingModel_1 = require("../models/bookingModel");
// ~ Basic Forms Operations
exports.createBooking = (0, factory_1.createEntitiy)(bookingModel_1.BookingModel, "BookingModel");
exports.getBooking = (0, factory_1.getEntitiy)(bookingModel_1.BookingModel);
exports.getAllBookings = (0, factory_1.getAllEntitiy)(bookingModel_1.BookingModel);
exports.deleteBooking = (0, factory_1.deleteEntitiy)(bookingModel_1.BookingModel);
exports.updateBooking = (0, factory_1.updateEntitiy)(bookingModel_1.BookingModel);
