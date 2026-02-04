import React, { useMemo } from 'react';
import { useDateTimePreference } from '../../context/date-time-preference.context';
import { DateTimeFormatOptions } from '../../types/date-time.type';
import { Formatter } from '../../utils/formatter/formatter';

interface Props {
  value: Date | number | string;
  formatOptions?: DateTimeFormatOptions;
  showTzLabel?: boolean;
}

export const DateTimeDisplay = ({ value, formatOptions, showTzLabel = false }: Props) => {
  const { preference } = useDateTimePreference();

  const text = useMemo(
    () => Formatter.formatDateTimeV2(value, preference, formatOptions),
    [value, preference, formatOptions],
  );

  const label = preference === 'utc' ? 'UTC' : 'Local';

  const content = (
    <>
      {text}
      {showTzLabel && <span> ({label})</span>}
    </>
  );

  return <span>{content}</span>;
};
