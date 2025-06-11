import {
    faPlaneDeparture,
    faBullhorn,
    faCalendarAlt,
    faCalendarCheck,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const services = [
    { name: "Apply Leave", path: "/admin/admin-leave", icon: faPaperPlane },
    { name: "Track Leaves", path: "/admin/track-leave", icon: faPlaneDeparture },
    { name: "Announcements", path: "/announcements", icon: faBullhorn },
    { name: "Calendar", path: "/calendar", icon: faCalendarAlt },
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