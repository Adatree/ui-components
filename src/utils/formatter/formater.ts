import { format, parseISO } from 'date-fns';
import { Logger } from '../logger/logger';

const DATE_FORMAT = 'dd/MM/yyyy';
const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm';
const DATE_TIME_TZ_FORMAT = 'dd/MM/yyyy HH:mm:ss xx';
/*
 * We use date-fns format that returns the
 * formatted date string in the given format.
 * Its important to note the result may vary by locale.
 * https://date-fns.org/docs/format
 */
const formatDate = (date: Date | string | undefined): string => {
  if (date instanceof Date) {
    return format(date, DATE_FORMAT);
  } else if (typeof date === 'string') {
    try {
      return format(parseISO(date), DATE_FORMAT);
    } catch (error) {
      Logger.error('Unable to format date', date);
      return '';
    }
  }
  Logger.error('Unable to format date', date);
  return '';
};

const formatDateTime = (date: Date | string | undefined): string => {
  if (date instanceof Date) {
    return format(date, DATE_TIME_FORMAT);
  } else if (typeof date === 'string') {
    try {
      return format(parseISO(date), DATE_TIME_FORMAT);
    } catch (error) {
      Logger.error('Unable to format date', date);
      return '';
    }
  }
  Logger.error('Unable to format date', date);
  return '';
};

const formatDateTimeTz = (date: Date | string | undefined): string => {
  if (date instanceof Date) {
    return format(date, DATE_TIME_TZ_FORMAT);
  } else if (typeof date === 'string') {
    try {
      return format(parseISO(date), DATE_TIME_TZ_FORMAT);
    } catch (error) {
      Logger.error('Unable to format date', date);
      return '';
    }
  }
  Logger.error('Unable to format date', date);
  return '';
};

export const Formatter = {
  formatDate,
  formatDateTime,
  formatDateTimeTz,
};
