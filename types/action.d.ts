interface createTagParams {
  name: string;
}

interface Tag {
  _id: string;
  name: string;
  createdAt: Date;
}
interface Category {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
}
