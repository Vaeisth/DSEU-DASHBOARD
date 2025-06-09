import {
    faUserCheck,
    faFileAlt,
    faPlaneDeparture,
    faBullhorn,
    faCalendarAlt,
    faUniversity,
    faFileArchive,
    faVideo,
    faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

const services = [
    { name: "Attendance", path: "/attendance", icon: faUserCheck },
    { name: "Reports", path: "/reports", icon: faFileAlt },
    { name: "Track Leave", path: "/track-leave", icon: faPlaneDeparture },
    { name: "Announcements", path: "/announcements", icon: faBullhorn },
    { name: "Calendar", path: "/calendar", icon: faCalendarAlt },
    { name: "Campus List", path: "/campus", icon: faUniversity },
    { name: "File Tracking", path: "/filetracking", icon: faFileArchive },
    { name: "Surveillance", path: "/surveillance", icon: faVideo },
    { name: "Inventory", path: "/inventory", icon: faBoxOpen },
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
    "bg-[#A3EEE7]",
];

export { buttonColors, services };