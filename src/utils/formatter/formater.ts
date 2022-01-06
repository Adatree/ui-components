import { format, parseISO } from 'date-fns';
import { logger } from '../logger/logger';

const DATE_FORMAT = 'dd/MM/yyyy';
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
      logger.error('Unable to format date', date);
      return '';
    }
  }
  logger.error('Unable to format date', date);
  return '';
};

export const Formatter = {
  formatDate,
};
