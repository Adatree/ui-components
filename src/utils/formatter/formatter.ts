import { format, parseISO } from 'date-fns';
import { Logger } from '../logger/logger';
import { DateTimeFormatOptions, DateTimePreference } from '../../types/date-time.type';

const DATE_FORMAT = 'dd/MM/yyyy';
const DATE_TIME_FORMAT = 'dd/MM/yyyy hh:mm aaa';
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
  if (date) {
    Logger.error('Unable to format date', date);
  }

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
  if (date) {
    Logger.error('Unable to format date', date);
  }

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
  if (date) {
    Logger.error('Unable to format date', date);
  }

  return '';
};

export const formatDateTimeV2 = (
  input: Date | number | string | undefined,
  preference: DateTimePreference,
  opts: DateTimeFormatOptions = {},
): string => {
  if (input) {
    const date = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(date.getTime())) return 'Invalid date';

    const { locale, intlOptions } = opts;

    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      ...(preference === 'utc' ? { timeZone: 'UTC' } : {}),
      ...intlOptions,
    });

    return formatter.format(date);
  } else {
    return '';
  }
};

export const Formatter = {
  formatDate,
  formatDateTime,
  formatDateTimeV2,
  formatDateTimeTz,
};
