import { SharingDuration } from '@adatree/react-api-sdk';

export type DateDuration = {
  type: SharingDuration;
  unit: 'd' | 'w' | 'm' | 'y' | 'na';
  value: number;
  text: string;
};

export const DateDurationList: DateDuration[] = [
  {
    type: SharingDuration.OneDay,
    unit: 'd',
    value: 1,
    text: '1 day',
  },
  {
    type: SharingDuration.OneWeek,
    unit: 'w',
    value: 1,
    text: '1 week',
  },
  {
    type: SharingDuration.TwoWeeks,
    unit: 'w',
    value: 2,
    text: '2 weeks',
  },
  {
    type: SharingDuration.OneMonth,
    unit: 'm',
    value: 1,
    text: '1 month',
  },
  {
    type: SharingDuration.ThreeMonths,
    unit: 'm',
    value: 3,
    text: '3 months',
  },
  {
    type: SharingDuration.SixMonths,
    unit: 'm',
    value: 6,
    text: '6 months',
  },
  {
    type: SharingDuration.NineMonths,
    unit: 'm',
    value: 9,
    text: '9 months',
  },
  {
    type: SharingDuration.OneYear,
    unit: 'y',
    value: 1,
    text: '1 year',
  },
  {
    type: SharingDuration.OnceOff,
    unit: 'd',
    value: 0,
    text: 'Once off',
  },
  {
    type: SharingDuration.Custom,
    unit: 'na',
    value: 0,
    text: 'Custom',
  },
];
