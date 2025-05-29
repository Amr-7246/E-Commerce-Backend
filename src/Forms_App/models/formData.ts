import { model, Schema } from "mongoose";

interface IFormData {
    formTitle: string; 
    submissionDate: Date;
    answers: string[];
    status: 'pending' | 'reviewed' | 'approved' | 'rejected';
}
const FormDataSchema = new Schema<IFormData>({
    formTitle: { type: String, required: true, trim: true },
    submissionDate: { type: Date, default: Date.now },
    answers: [{ type: String, required: true }],
    status: { type: String, enum: ['pending', 'reviewed', 'approved', 'rejected'], default: 'pending' }
});

export const FormData = model<IFormData>('FormData', FormDataSchema);