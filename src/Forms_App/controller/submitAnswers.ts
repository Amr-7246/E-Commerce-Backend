import { Request, Response , NextFunction } from 'express';
import { FormBlueprintModel } from '../models/formBlueprint';

interface IAnswers {
  [key: string]: any
}

interface SubmissionRequest extends Request {
  body: {
    formId: string;
    userAnswers: IAnswers 
  };
}

export const submitFormAnswers = async (req: SubmissionRequest, res: Response , next: NextFunction): Promise<void> => {
  try {
    const { formId , userAnswers } = req.body;

    // * Validate required fields
    if (!formId || !userAnswers ) {
      res.status(400).json({
        success: false,
        message: 'Form ID and answers are required'
      });
      return;
    }
    // * Find the form by ID
    const form = await FormBlueprintModel.findById(formId);
    if (!form) {
      res.status(404).json({
        success: false,
        message: 'Form not found'
      });
      return;
    }
    // * Add submission to form's answers array
    form.answers.push(userAnswers);
    await form.save();

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: form.answers[form.answers.length - 1]._id
    });
    return;

  } catch (error) {
    next(error);
    console.error('Error submitting form:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
    return;
  }
};

// * Helper function to validate answers against form structure

    // * Optional: Validate answers against form structure
    // const validationResult = validateAnswers(form.structuer , userAnswers);
    // if (!validationResult.isValid) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid answers provided',
    //     errors: validationResult.errors
    //   });
    // }

// const validateAnswers = (formStructure: any[], userAnswers: any[]) => {
//   const errors: string[] = [];
//   const answerMap = new Map(userAnswers.map(a => [ a.questionId, a.answer]));

//   // * Check each question in form structure
//   formStructure.forEach(question => {
//     const userAnswer = answerMap.get(question.id || question.questionId);

//     // * Check required fields
//     if (question.required && (userAnswer === undefined || userAnswer === null || userAnswer === '')) {
//       errors.push(`Question "${question.label || question.title}" is required`);
//     }

//     // * Type-specific validation
//     if (userAnswer !== undefined && userAnswer !== null) {
//       switch (question.type) {
//         case 'email':
//           if (typeof userAnswer !== 'string' || !/\S+@\S+\.\S+/.test(userAnswer)) {
//             errors.push(`Invalid email format for "${question.label}"`);
//           }
//           break;
//         case 'number':
//           if (isNaN(Number(userAnswer))) {
//             errors.push(`"${question.label}" must be a number`);
//           }
//           break;
//         case 'select':
//         case 'radio':
//           if (question.options && !question.options.includes(userAnswer)) {
//             errors.push(`Invalid option selected for "${question.label}"`);
//           }
//           break;
//         case 'checkbox':
//           if (!Array.isArray(userAnswer)) {
//             errors.push(`"${question.label}" must be an array`);
//           }
//           break;
//       }
//     }
//   });

//   return {
//     isValid: errors.length === 0,
//     errors
//   };
// };

// ~ ############### UpdatePartFromEntitiy