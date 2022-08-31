import * as React from 'react';
import { Organisation } from '../types/organisation.type';

const OrganisationContext = React.createContext<
  [Organisation, React.Dispatch<React.SetStateAction<Organisation>>] | undefined
>(undefined);

const useOrg = () => {
  const context = React.useContext(OrganisationContext);
  if (!context) {
    throw new Error('useOrg must be used within a OrganisationProvider');
  }
  return context;
};

type OrganisationProviderProps = {
  children: React.ReactNode;
  org: Organisation;
};

const OrganisationProvider = ({ children, org }: OrganisationProviderProps) => {
  const [organisation, setOrganisation] = React.useState<Organisation>(org);
  return (
    <OrganisationContext.Provider value={[organisation, setOrganisation]}>{children}</OrganisationContext.Provider>
  );
};

export { OrganisationProvider, useOrg };
