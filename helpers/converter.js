const timeDiff = (time) => {
  const diffInMiliSecond = new Date() - new Date(time);
  const minutes = Math.floor(diffInMiliSecond / 1000 / 60);
  const hour = Math.floor(minutes / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 30);

  if (month > 1) {
    return `${month} months ago`;
  }
  if (month === 1) {
    return "a month ago";
  }
  if (day > 1) {
    return `${day} days ago`;
  }
  if (day === 1) {
    return "a day ago";
  }
  if (hour > 1) {
    return `${hour} hours ago`;
  }
  if (hour === 1) {
    return "an hour ago";
  }
  if (minutes > 1) {
    return `${minutes} minutes ago`;
  }
  if (minutes === 1) {
    return "a minute ago";
  }
  return "Just now";
};

const prizeToText = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

module.exports = { timeDiff, prizeToText };
