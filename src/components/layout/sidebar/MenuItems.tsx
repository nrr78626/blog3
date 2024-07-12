import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/Dashboard",
  },
  {
    id: uniqueId(),
    title: "All Blogs",
    icon: IconCircleDot,
    href: "/Dashboard/AllBlogs",
  },
  {
    id: uniqueId(),
    title: "Add Blog",
    icon: IconTable,
    href: "/Dashboard/AddBlog",
  },
  {
    id: uniqueId(),
    title: "All Authers",
    icon: IconInfoCircle,
    href: "/Dashboard/AllAuthers",
  },
  {
    id: uniqueId(),
    title: "Add Auther",
    icon: IconStar,
    href: "/Dashboard/AddAuther",
  },
  {
    id: uniqueId(),
    title: "All Users",
    icon: IconPhoto,
    href: "/Dashboard/AllUsers",
  },
  {
    id: uniqueId(),
    title: "Pagination",
    icon: IconUser,
    href: "/ui-components/pagination",
  },
  {
    id: uniqueId(),
    title: "Tables",
    icon: IconLayoutGrid,
    href: "/ui-components/table",
  },
];

export default Menuitems;
