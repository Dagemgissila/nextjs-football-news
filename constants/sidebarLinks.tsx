import { LayoutDashboard, Users, FileText, Folder, Tag } from "lucide-react";

export const sidebarLinks = [
  {
    icon: <LayoutDashboard size={20} />,
    route: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    icon: <Users size={20} />,
    route: "/admin/users",
    label: "Users",
  },
  {
    icon: <FileText size={20} />,
    route: "/admin/posts",
    label: "Posts",
  },
  {
    icon: <Folder size={20} />,
    route: "/admin/categories",
    label: "Categories",
  },
  {
    icon: <Tag size={20} />,
    route: "/admin/tags",
    label: "Tags",
  },
];
