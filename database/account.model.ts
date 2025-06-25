import { model, models, Schema, Types } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  password?: string;
  provider: string;
  providerAccountId: string;
}

export interface IAccountDoc extends IAccount, Document {}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, require: true },
    password: { type: String },
    provider: { type: String, require: true },
    providerAccountId: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);
export default Account;
