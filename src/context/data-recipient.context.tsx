import * as React from 'react';
import { DataRecipient } from '../types/data-recipient.type';
import { Helper } from '../utils/helper/helper';

type DataRecipientsContextType = {
  accreditationNumber: string;
  adrDataRecipient: DataRecipient;
  primaryDataRecipient: DataRecipient;
  dataRecipients: DataRecipient[];
  nonAdrDataRecipient: DataRecipient | undefined;
  addDataRecipient: (dataRecipient: DataRecipient) => void;
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
  accreditationNum: string;
  children: React.ReactNode;
  initialDataRecipients: DataRecipient[];
};

const DataRecipientsProvider = ({ accreditationNum, children, initialDataRecipients }: DataRecipientsProviderProps) => {
  const [accreditationNumber] = React.useState<string>(accreditationNum);
  const [adrDataRecipient, setAdrDataRecipient] = React.useState<DataRecipient>(
    Helper.getAdrDataRecipients(initialDataRecipients),
  );
  const [dataRecipients, setDataRecipients] = React.useState<DataRecipient[]>(initialDataRecipients);
  const [primaryDataRecipient, setPrimaryDataRecipient] = React.useState<DataRecipient>(
    Helper.getPrimaryDataRecipients(initialDataRecipients),
  );
  const [nonAdrDataRecipient, setNonAdrDataRecipient] = React.useState<DataRecipient | undefined>(
    Helper.getNonAdrDataRecipient(initialDataRecipients),
  );

  const addDataRecipient = (dataRecipient: DataRecipient) => {
    const dataRecipientsClone = [...dataRecipients];
    dataRecipientsClone.push(dataRecipient);

    setDataRecipients(dataRecipientsClone);
    setAdrDataRecipient(Helper.getAdrDataRecipients(dataRecipientsClone));
    setPrimaryDataRecipient(Helper.getPrimaryDataRecipients(dataRecipientsClone));
    setNonAdrDataRecipient(Helper.getNonAdrDataRecipient(dataRecipientsClone));
  };

  return (
    <DataRecipientsContext.Provider
      value={{
        accreditationNumber,
        adrDataRecipient,
        primaryDataRecipient,
        dataRecipients,
        nonAdrDataRecipient,
        addDataRecipient,
        setDataRecipients,
      }}
    >
      {children}
    </DataRecipientsContext.Provider>
  );
};

export { DataRecipientsProvider, useDataRecipients };
