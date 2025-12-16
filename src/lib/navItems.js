import { GoHomeFill } from "react-icons/go";
import { MdCalendarMonth } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
const navItems = [
  {
    name: "Overview",
    icon: GoHomeFill,
    path: "/dashboard/overview",
  },
  {
    name: "Tasks",
    icon: MdCalendarMonth,
    path: "/dashboard/tasks",
  },
  {
    name: "Projects",
    icon: FaRegFileLines,
    path: "/dashboard/projects",
  },
  {
    name: "Team",
    icon: GoPeople,
    path: "/dashboard/team",
  },
];

export default navItems;
