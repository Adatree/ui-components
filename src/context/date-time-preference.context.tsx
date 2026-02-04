import React, { createContext, useContext, useMemo, useState } from 'react';
import { DateTimePreference } from '../types/date-time.type';
import { StorageKeys } from '../consts/storage-keys.const';

type DateTimePreferenceContextValue = {
  preference: DateTimePreference;
  setPreference: (preference: DateTimePreference) => void;
  togglePreference: () => void;
};

const DateTimePreferenceContext = createContext<DateTimePreferenceContextValue | null>(null);

const readInitialPreference = (defaultPreference: DateTimePreference): DateTimePreference => {
  if (typeof window === 'undefined') return defaultPreference;
  const raw = window.localStorage.getItem(StorageKeys.dateTimePreference);
  return raw === 'utc' || raw === 'local' ? raw : defaultPreference;
};

export const DateTimePreferenceProvider: React.FC<{
  children: React.ReactNode;
  defaultPreference?: DateTimePreference;
  persist?: boolean;
}> = ({ children, defaultPreference = 'local', persist = true }) => {
  const [preference, setPreferenceState] = useState<DateTimePreference>(() =>
    persist ? readInitialPreference(defaultPreference) : defaultPreference,
  );

  const setPreference = (next: DateTimePreference) => {
    setPreferenceState(next);
    if (persist && typeof window !== 'undefined') {
      window.localStorage.setItem(StorageKeys.dateTimePreference, next);
    }
  };

  const togglePreference = () => {
    setPreference(preference === 'utc' ? 'local' : 'utc');
  };

  const value = useMemo(() => ({ preference, setPreference, togglePreference }), [preference]);

  return <DateTimePreferenceContext.Provider value={value}>{children}</DateTimePreferenceContext.Provider>;
};

export const useDateTimePreference = (): DateTimePreferenceContextValue => {
  const ctx = useContext(DateTimePreferenceContext);
  if (!ctx) {
    throw new Error('useDateTimePreference must be used within a DateTimePreferenceProvider');
  }
  return ctx;
};
