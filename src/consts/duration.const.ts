export type DateDuration = {
  unit: 'd' | 'w' | 'm' | 'y' | 'na';
  value: number;
  text: string;
  isSelected?: boolean;
};

export type DateDurationsType = {
  [key: string]: DateDuration;
};

export const DateDurationList: DateDurationsType = {
  ONE_DAY: {
    unit: 'd',
    value: 1,
    text: '1 day',
  },
  ONE_WEEK: {
    unit: 'w',
    value: 1,
    text: '1 week',
  },
  TWO_WEEKS: {
    unit: 'w',
    value: 2,
    text: '2 weeks',
  },
  ONE_MONTH: {
    unit: 'm',
    value: 1,
    text: '1 month',
  },
  THREE_MONTHS: {
    unit: 'm',
    value: 3,
    text: '3 months',
  },
  SIX_MONTHS: {
    unit: 'm',
    value: 6,
    text: '6 months',
  },
  NINE_MONTHS: {
    unit: 'm',
    value: 9,
    text: '9 months',
  },
  ONE_YEAR: {
    unit: 'y',
    value: 1,
    text: '1 year',
  },
  ONCE_OFF: {
    unit: 'na',
    value: 0,
    text: 'Once off',
  },
  CUSTOM: {
    unit: 'na',
    value: 0,
    text: 'Custom',
  },
};
