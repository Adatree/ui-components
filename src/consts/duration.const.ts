import { SharingDuration } from '../generated/consent/api';

export type DateDuration = {
  type: SharingDuration;
  unit: 'd' | 'w' | 'm' | 'y' | 'na';
  value: number;
  text: string;
};

export const DateDurationList: DateDuration[] = [
  {
    type: SharingDuration.ONEDAY,
    unit: 'd',
    value: 1,
    text: '1 day',
  },
  {
    type: SharingDuration.ONEWEEK,
    unit: 'w',
    value: 1,
    text: '1 week',
  },
  {
    type: SharingDuration.TWOWEEKS,
    unit: 'w',
    value: 2,
    text: '2 weeks',
  },
  {
    type: SharingDuration.ONEMONTH,
    unit: 'm',
    value: 1,
    text: '1 month',
  },
  {
    type: SharingDuration.THREEMONTHS,
    unit: 'm',
    value: 3,
    text: '3 months',
  },
  {
    type: SharingDuration.SIXMONTHS,
    unit: 'm',
    value: 6,
    text: '6 months',
  },
  {
    type: SharingDuration.NINEMONTHS,
    unit: 'm',
    value: 9,
    text: '9 months',
  },
  {
    type: SharingDuration.ONEYEAR,
    unit: 'y',
    value: 1,
    text: '1 year',
  },
  {
    type: SharingDuration.ONCEOFF,
    unit: 'd',
    value: 0,
    text: 'Once off',
  },
  {
    type: SharingDuration.CUSTOM,
    unit: 'na',
    value: 0,
    text: 'Custom',
  },
];
