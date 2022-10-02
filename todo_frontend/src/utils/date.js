import moment from 'moment';

export const getFormattedDateString = (dateString) => {
  const date = new Date(dateString);
  return moment(date).format('MM/DD/YYYY h:mm a');
};

export const getMaterialUIDateString = (dateString) => {
  const date = new Date(dateString);
  return moment(date).format('YYYY-MM-DDTkk:mm');
};

export const convertLocalToUTC = (localDate) => {
  const date = new Date(localDate);
  const utc = date.toISOString();
  return utc;
};
