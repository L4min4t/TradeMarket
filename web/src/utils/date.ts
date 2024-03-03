export const getFormattedDate = (date: Date) => {
    const createdDate = date instanceof Date ? date : new Date(date);

    return createdDate.toLocaleDateString("ua-UK", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric"
    });
};
