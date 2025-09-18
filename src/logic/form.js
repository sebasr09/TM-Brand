import moment from 'moment-timezone';

export const getStringDate = (date) => {
    const momentDate = moment.tz(date, 'America/Bogota');
    return momentDate.format();
}