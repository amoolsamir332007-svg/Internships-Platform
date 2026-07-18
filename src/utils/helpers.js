export const formatDate = (date) => {
    if (!date) return "";
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

};

export const truncateText = (text, length = 100) => {
    if (!text) return "";
    if (text.length <= length) {
        return text;
    }
    return text.substring(0, length) + "...";
};

export const capitalize = (text) => {
    if (!text) return "";
    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

};

export const getStatusColor = (status) => {
    const numericStatusMap = {
        0: "draft",
        1: "published",
        2: "closed",
    };

    const normalizedStatus =
        typeof status === "number"
            ? numericStatusMap[status]
            : String(status ?? "").toLowerCase();
    switch (normalizedStatus) {
        case "accepted":
            return "status-success";
        case "rejected":
            return "status-danger";
        case "pending":
            return "status-warning";
        case "published":
            return "status-success";
        case "draft":
            return "status-warning";
        case "closed":

            return "status-danger";
        default:
            return "status-default";
    }

};

export const getStatusLabel = (status) => {
 
    const numericStatusMap = {
        0: "Draft",
        1: "Published",
        2: "Closed",
    };
 
    if (typeof status === "number") {
        return numericStatusMap[status] || "Unknown";
    }
     return capitalize(String(status ?? ""));
 };

const APPLICATION_STATUS_NUMERIC_MAP = {
    0: "pending",  
    1: "accepted",  
    2: "rejected",  
};
 
export const normalizeApplicationStatus = (status) => {
     if (typeof status === "number") {
        return APPLICATION_STATUS_NUMERIC_MAP[status] || "pending";
    }
     const normalized = String(status ?? "").toLowerCase();
     if (normalized === "submitted") return "pending";
    if (normalized === "approved") return "accepted";
     return normalized || "pending";
 
};
 
export const getApplicationStatusColor = (status) => {
 
    switch (normalizeApplicationStatus(status)) {
        case "accepted":
            return "status-success";
        case "rejected":
            return "status-danger";
        case "pending":
        default:
            return "status-warning";
    }
 
};
 
export const getApplicationStatusLabel = (status) => {
    return capitalize(normalizeApplicationStatus(status));
};
 
export const validateEmail = (email)=>{
const regex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);
};

export const getInitials = (name)=>{
if(!name)
return "";
return name
.split(" ")
.map(word=>word[0])
.join("")
.toUpperCase();
};

export const debounce = (func, delay)=>{
let timer;
return (...args)=>{
clearTimeout(timer);
timer=setTimeout(()=>{
func(...args);
},delay);
};
};
