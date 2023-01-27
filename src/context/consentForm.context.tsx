import * as React from 'react';
import { DataHolder, PostUsageAction, SharingDuration } from '../generated/consent';

type ConsentForm = {
  allAddScopesChecked: boolean;
  allRemoveScopesChecked: boolean;
  dataHolder: DataHolder | undefined;
  selectedSharingDurations: SharingDuration | undefined;
  postUsageAction: PostUsageAction | undefined;
  sharingEndDate: Date | undefined;
  useCaseId: string | undefined;
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
  allAddScopesChecked: false,
  allRemoveScopesChecked: false,
  dataHolder: undefined,
  selectedSharingDurations: undefined,
  postUsageAction: PostUsageAction.Deletion,
  sharingEndDate: undefined,
  useCaseId: undefined,
};

const ConsentFormProvider = ({ children, initialValues = ConsentFormDefaultValues }: ConsentFormProviderProps) => {
  const [consent, setConsent] = React.useState<ConsentForm>(initialValues);
  return <ConsentFormContext.Provider value={[consent, setConsent]}>{children}</ConsentFormContext.Provider>;
};

export { ConsentFormProvider, useConsentForm };
