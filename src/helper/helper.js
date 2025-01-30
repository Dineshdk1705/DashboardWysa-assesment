export const getFormateDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const day = date.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  return `${day} ${month}, ${year}`;
};
