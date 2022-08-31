import * as React from 'react';
import { Copy } from '../types/copy.type';

const CopyContext = React.createContext<[Copy, React.Dispatch<React.SetStateAction<Copy>>] | undefined>(undefined);

const useCopy = () => {
  const context = React.useContext(CopyContext);
  if (!context) {
    throw new Error('useCopy must be used within a CopyProvider');
  }
  return context;
};

type CopyProviderProps = {
  children: React.ReactNode;
  initialCopy: Copy;
};

const CopyProvider = ({ children, initialCopy }: CopyProviderProps) => {
  const [copy, setCopy] = React.useState<Copy>(initialCopy);
  return <CopyContext.Provider value={[copy, setCopy]}>{children}</CopyContext.Provider>;
};

export { CopyProvider, useCopy };
