export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatEventTimes = (startStr, endStr) => {
  const start = new Date(startStr);
  const end = new Date(endStr);

  const isSameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };

  if (isSameDay) {
    const date = start.toLocaleDateString('en-US', dateOptions);
    const startTime = start.toLocaleTimeString('en-US', timeOptions);
    const endTime = end.toLocaleTimeString('en-US', timeOptions);

    return `${date} | ${startTime} – ${endTime}`;
  }

  return `${start.toLocaleString('en-US', { ...dateOptions, ...timeOptions })} – ${end.toLocaleString('en-US', { ...dateOptions, ...timeOptions })}`;
};