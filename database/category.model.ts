import { model, models, Schema } from "mongoose";

export interface ICategory {
  name: string;
  image: string;
}
export interface ICategoryDoc extends ICategory, Document {}
const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  image: { type: String, require: true },
});

const Category = models?.Category || model("Category", CategorySchema);
export default Category;
