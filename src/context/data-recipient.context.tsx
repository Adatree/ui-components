import * as React from 'react';
import { DataRecipient } from '../types/data-recipient.type';

const DataRecipientContext = React.createContext<
  [DataRecipient, React.Dispatch<React.SetStateAction<DataRecipient>>] | undefined
>(undefined);

const useDataRecipient = () => {
  const context = React.useContext(DataRecipientContext);
  if (!context) {
    throw new Error('useDataRecipient must be used within a DataRecipientProvider');
  }
  return context;
};

type DataRecipientProviderProps = {
  children: React.ReactNode;
  dataRecipient: DataRecipient;
};

const DataRecipientProvider = ({ children, dataRecipient }: DataRecipientProviderProps) => {
  const [recipient, setDataRecipient] = React.useState<DataRecipient>(dataRecipient);
  return (
    <DataRecipientContext.Provider value={[recipient, setDataRecipient]}>{children}</DataRecipientContext.Provider>
  );
};

export { DataRecipientProvider, useDataRecipient };
