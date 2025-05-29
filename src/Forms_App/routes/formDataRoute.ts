import express from 'express';
import { pushFormData, getFormData, getAllFormData, deleteFormData, updateFormData } from '../controller';

const router = express.Router();

router.route('/')
    .get(getAllFormData)
    .post(pushFormData);

router.route('/:id')
    .get(getFormData)
    .patch(updateFormData)
    .delete(deleteFormData);

export const formDataRouter = router;