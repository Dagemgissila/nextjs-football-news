import { Schema, model, models, Document } from "mongoose";

// Interface for PersonInput (one of the 3 people)
export interface IPersonInput {
  name: string;
  age: number;
  career: string;
  personality: string;
  lovePercent: number;
  dated: boolean;
  datingDuration?: string;
}

// Interface for UserInfo (the main user)
export interface IUserInfo {
  name: string;
  gender: string;
  age: number;
  career: string;
  personality: string;
  preferences: string[];
  loveExpectation: string;
  idealDuration?: string;
}

// Interface for Prediction document (MongoDB document)
export interface IPredictionDoc extends Document {
  user: IUserInfo;
  people: IPersonInput[];
  createdAt: Date;
}

// PersonInput Schema
const PersonInputSchema = new Schema<IPersonInput>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  career: { type: String, required: true },
  personality: { type: String, required: true },
  lovePercent: { type: Number, required: true },
  dated: { type: Boolean, required: true },
  datingDuration: { type: String },
});

// UserInfo Schema
const UserInfoSchema = new Schema<IUserInfo>({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  career: { type: String, required: true },
  personality: { type: String, required: true },
  preferences: [{ type: String }],
  loveExpectation: { type: String, required: true },
  idealDuration: { type: String },
});

// Prediction Schema
const PredictionSchema = new Schema<IPredictionDoc>(
  {
    user: { type: UserInfoSchema, required: true },
    people: { type: [PersonInputSchema], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Prediction =
  models.Prediction || model<IPredictionDoc>("Prediction", PredictionSchema);

export default Prediction;
