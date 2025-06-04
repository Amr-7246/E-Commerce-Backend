import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "../../utils/factory";
import { BookingModel } from "../models/bookingModel";

// ~ Basic Forms Operations
export const createBooking = createEntitiy(BookingModel as any, "BookingModel");
export const getBooking = getEntitiy(BookingModel as any);
export const getAllBookings = getAllEntitiy(BookingModel as any);
export const deleteBooking = deleteEntitiy(BookingModel as any);
export const updateBooking: ReturnType<typeof updateEntitiy> = updateEntitiy(BookingModel as any);



