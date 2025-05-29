import express from 'express';
import { createFormBluprint, deleteFormBluprint, getAllFormBluprints, getFormBluprint, updateFormBluprint } from '../controller';
import { submitFormAnswers } from '../controller/submitAnswers';

const router = express.Router();

router.route('/')
    .get(getAllFormBluprints)
    .post(createFormBluprint);

router.route('/:id')
    .get(getFormBluprint)
    .patch(updateFormBluprint)
    .delete(deleteFormBluprint);

router.post('/submit/:id', submitFormAnswers);

export const formBlueprintRouter = router;