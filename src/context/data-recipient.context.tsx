import * as React from 'react';
import { DataRecipient } from '../types/data-recipient.type';
import { Helper } from '../utils/helper/helper';

type DataRecipientsContextType = {
  adrDataRecipient: DataRecipient;
  primaryDataRecipient: DataRecipient;
  dataRecipients: DataRecipient[];
  setDataRecipients: React.Dispatch<React.SetStateAction<DataRecipient[]>>;
};

const DataRecipientsContext = React.createContext<DataRecipientsContextType | undefined>(undefined);

const useDataRecipients = () => {
  const context = React.useContext(DataRecipientsContext);
  if (!context) {
    throw new Error('useDataRecipients must be used within a DataRecipientsProvider');
  }
  return context;
};

type DataRecipientsProviderProps = {
  children: React.ReactNode;
  initialDataRecipients: DataRecipient[];
};

const DataRecipientsProvider = ({ children, initialDataRecipients }: DataRecipientsProviderProps) => {
  const [adrDataRecipient] = React.useState<DataRecipient>(Helper.getAdrDataRecipients(initialDataRecipients));
  const [dataRecipients, setDataRecipients] = React.useState<DataRecipient[]>(initialDataRecipients);
  const [primaryDataRecipient] = React.useState<DataRecipient>(Helper.getPrimaryDataRecipients(initialDataRecipients));

  return (
    <DataRecipientsContext.Provider
      value={{ adrDataRecipient, primaryDataRecipient, dataRecipients, setDataRecipients }}
    >
      {children}
    </DataRecipientsContext.Provider>
  );
};

export { DataRecipientsProvider, useDataRecipients };
