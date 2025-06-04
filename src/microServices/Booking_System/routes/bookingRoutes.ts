import express from 'express';
import { createBooking, deleteBooking, getAllBookings, getBooking, updateBooking } from '../controller';

const router = express.Router();

router.route('/')
    .get(getAllBookings)
    .post(createBooking);

router.route('/:id')
    .get(getBooking)
    .patch(updateBooking)
    .delete(deleteBooking);

export const bookingRouter = router;