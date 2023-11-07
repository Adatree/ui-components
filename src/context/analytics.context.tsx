import * as React from 'react';
import { createContext, ReactElement, useContext } from 'react';
import { Logger } from '../utils/logger/logger';

export const AnalyticsComponentMeta = {
  ADT_CMP_DH_TILE: { id: 'ADT_CMP_DH_TILE', description: 'Data holder tile' },
  ADT_CMP_DH_DD: { id: 'ADT_CMP_DH_DD', description: 'Data holder dropdown' },
};

export const AnalyticsEvents = {
  PAGE_LOAD: 'Page load',
  UI_INTERACTION: 'UI interaction',
};

export const AnalyticsAction = {
  OPEN: 'Open',
  CLICK: 'Click',
  CLOSE: 'Close',
  BACK: 'Back',
  NEXT: 'Next',
  RESET: 'Reset',
  SUBMIT: 'Submit',
};

interface ContextProps {
  track: (event: string, componentId: string, componentDescription: string, action: string, value?: string) => void;
}

const AnalyticsContext = createContext<ContextProps | undefined>(undefined);

const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within a AnalyticsContext');
  }
  return context;
};

interface ProviderProps {
  /**
   * Called when a user interacts with a component. (Not all component interactions have been implemented, see Changelog for details)
   *
   * @param event - Description of the event, Example: Page load or Consent created,
   * @param componentId - Unqie ID of the component.
   * @param componentDescription - Description of the component.
   * @param action - The action (CLICK, OPEN, CLOSED ...) performed on the component.
   * @param value - An optional value related to the component interaction. Example: the value of an item selected in a dropdown.
   *
   */
  onTrack?: (event: string, componentId: string, componentDescription: string, action: string, value?: string) => void;
  children: ReactElement | ReactElement[];
}
/**
 * A generic analytics context provider.
 *
 * @param onTrack - Callback function to handle the components tracking calls
 *
 */
const AnalyticsProvider = ({ children, onTrack }: ProviderProps) => {
  const track = (event: string, componentId: string, componentDescription: string, action: string, value?: string) => {
    if (onTrack) {
      onTrack(event, componentId, componentDescription, action, value);
    } else {
      Logger.warn(
        'useAnalytics onTrack function is not set. To remove this warning please provide an onTrack function to the AnalyticsProvider',
      );

      Logger.debug(
        `useAnalytics track called with id '${componentId}', description '${componentDescription}' and action '${action}'`,
      );
    }
  };

  return (
    <>
      <AnalyticsContext.Provider
        value={{
          track,
        }}
      >
        {children}
      </AnalyticsContext.Provider>
    </>
  );
};

export { AnalyticsProvider, useAnalytics };
