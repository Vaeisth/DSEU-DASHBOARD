import {
    faUserCheck,
    faPlaneDeparture,
    faBullhorn,
    faCalendarAlt,
    faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

const services = [
    { name: "Attendance", path: "/mark-attendance", icon: faUserCheck },
    { name: "Track Leaves", path: "/apply-leave", icon: faPlaneDeparture },
    { name: "Announcements", path: "/announcements", icon: faBullhorn },
    { name: "Calendar", path: "/holidays", icon: faCalendarAlt },
    { name: "On Duty", path: "/admin/on-duty", icon: faCalendarCheck },
];

const buttonColors = [
    "bg-[#C4DAFA]",
    "bg-[#EFFBEA]",
    "bg-[#F1D9FC]",
    "bg-[#FBD5D7]",
    "bg-[#FBF5EA]",
    "bg-[#FBC4DF]",
    "bg-[#FCDFE0]",
    "bg-[#C6FFEB]",
];


export { buttonColors, services };