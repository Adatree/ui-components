import * as React from 'react';
import { AccessFrequency, DataHolder, PostUsageAction } from '..';

type ConsentForm = {
  accessFrequency: AccessFrequency | undefined;
  checkedScopes: string[];
  dataHolder: DataHolder | undefined;
  postUsageAction: PostUsageAction | undefined;
  sharingEndDate: Date;
};

const ConsentFormContext = React.createContext<
  [ConsentForm, React.Dispatch<React.SetStateAction<ConsentForm>>] | undefined
>(undefined);

const useConsentForm = () => {
  const context = React.useContext(ConsentFormContext);
  if (!context) {
    throw new Error(`useConsentForm must be used within a ConsentFormProvider`);
  }
  return context;
};

type ConsentFormProviderProps = {
  children: React.ReactNode;
  initialValues?: ConsentForm;
};

const ConsentFormDefaultValues: ConsentForm = {
  accessFrequency: undefined,
  checkedScopes: [],
  dataHolder: undefined,
  postUsageAction: undefined,
  sharingEndDate: new Date(),
};

const ConsentFormProvider = ({ children, initialValues = ConsentFormDefaultValues }: ConsentFormProviderProps) => {
  const [consent, setConsent] = React.useState<ConsentForm>(initialValues);
  return <ConsentFormContext.Provider value={[consent, setConsent]}>{children}</ConsentFormContext.Provider>;
};

export { ConsentFormProvider, useConsentForm };
