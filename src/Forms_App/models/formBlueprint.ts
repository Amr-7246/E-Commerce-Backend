import { model, Schema } from "mongoose";

interface IFormBlueprint {
  type: string;
  title: string;
  placeholder: string;
  rules: {
    maxLength: number;
    minLength: number;
  }
}

interface IAnswers {
  [key: string]: any
}

interface IForm {
  title: string ; 
  structuer: IFormBlueprint[] ;
  answers: IAnswers[]
}

const FormBlueprint = new Schema<IForm>({
  title: { type: String, required: true, trim: true },
  structuer: [
    {
      type: {
        type: String,
        required: true,
        enum: ['text','textarea', 'email', 'number', 'date', 'select', 'checkbox', 'radio']
      },
      title: { type: String, required: true, trim: true },
      placeholder: { type: String, required: true, trim: true },
      rules: {
        maxLength: { type: Number, required: false, default: 255 },
        minLength: { type: Number, required: false, default: 0 }
      }
    }
  ],
  answers: [
    {
      type: Schema.Types.Mixed, // Allows for flexible answer types
      required: true
    }
  ]
}, {
  timestamps: true
});

export const FormBlueprintModel = model<IForm>('FormBlueprint', FormBlueprint);
