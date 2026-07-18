// تنسيق التاريخ
// تقصير النصوص الطويلة
// ألوان حالات الطلبات
// تحويل أول حرف Capital
// معالجة النصوص

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

// Convert first letter to uppercase
export const capitalize = (text) => {

    if (!text) return "";

    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

};
// Return color class based on status
// Handles status coming back as a string OR a number/enum from the API
// without throwing, and also maps common numeric enum values.
export const getStatusColor = (status) => {

    // Some backends send status as a numeric enum (0, 1, 2...) instead
    // of a string. Map the common cases here if that's what's happening.
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

// Return a human-readable label for a status, whether it comes back
// as a string or a numeric enum from the API.
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
 
// Check if email is valid
export const validateEmail = (email)=>{


const regex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


return regex.test(email);


};

// Generate initials from name
export const getInitials = (name)=>{


if(!name)
return "";


return name
.split(" ")
.map(word=>word[0])
.join("")
.toUpperCase();
};

// Delay function for debounce/search
export const debounce = (func, delay)=>{


let timer;


return (...args)=>{


clearTimeout(timer);


timer=setTimeout(()=>{

func(...args);

},delay);


};


};
    // export const formatDate = (dateString) => {
    // if (!dateString) return '';
    // const date = new Date(dateString);
    // return date.toLocaleDateString('ar-EG', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    // });
    // };


    // export const truncateText = (text, length = 100) => {
    // if (!text) return '';
    // if (text.length <= length) return text;
    // return text.substring(0, length) + '...';
    // };


    // export const getStatusColor = (status) => {
    // switch (status?.toLowerCase()) {
    //     case 'accepted':
    //     case 'published':
    //     return '#2ecc71'; // أخضر
    //     case 'pending':
    //     case 'draft':
    //     return '#f1c40f'; // أصفر
    //     case 'rejected':
    //     case 'closed':
    //     return '#e74c3c'; // أحمر
    //     default:
    //     return '#95a5a6'; // رمادي
    // }
    // };