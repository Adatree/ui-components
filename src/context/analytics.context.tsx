import * as React from 'react';
import { createContext, ReactNode, useContext } from 'react';
import { Logger } from '../utils/logger/logger';

export const AnalyticsComponentMeta = {
  ADT_CMP_DH_TILE: { id: 'ADT_CMP_DH_TILE', description: 'Data holder tile' },
  ADT_CMP_DH_DD: { id: 'ADT_CMP_DH_DD', description: 'Data holder dropdown' },
  ADT_CMP_INS_LT_INFO: { id: 'ADT_CMP_INS_LT_INFO', description: 'Insights list item info' },
  ADT_CMP_ACCORDION: { id: 'ADT_CMP_ACCORDION', description: 'Accordion' },
};

export const AnalyticsEvents = {
  CONSENT_EMAIL_SIGN_IN_PAGE_LOADED: 'Consent email sign in page loaded',
  CONSENT_EMAIL_SIGN_IN_PAGE_CANCEL_CLICKED: 'Consent email sign in page cancel clicked',
  CONSENT_EMAIL_SIGN_IN_ERROR_RECEIVED: 'Consent email sign in error received',

  CONSENT_OTP_PAGE_LOADED: 'Consent OTP page loaded',
  CONSENT_OTP_PAGE_CANCEL_CLICKED: 'Consent OTP page cancel clicked',
  CONSENT_OTP_ERROR_RECEIVED: 'Consent OTP error received',

  CONSENT_USE_CASE_PAGE_LOADED: 'Consent use case page loaded',
  CONSENT_USE_CASE_PAGE_CANCEL_CLICKED: 'Consent use case page cancel clicked',
  CONSENT_USE_CASE_ERROR_RECEIVED: 'Consent use case error received',

  CONSENT_CUSTOM_DATA_PAGE_LOADED: 'Consent custom data page loaded',
  CONSENT_CUSTOM_DATA_ERROR_RECEIVED: 'Consent custom data error received',

  CONSENT_DATAHOLDER_PAGE_LOADED: 'Consent dataholder page loaded',
  CONSENT_DATAHOLDER_PAGE_CANCEL_CLICKED: 'Consent dataholder page cancel clicked',
  CONSENT_DATAHOLDER_ERROR_RECEIVED: 'Consent dataholder error received',

  CONSENT_PAGE_LOADED: 'Consent page loaded',
  CONSENT_PAGE_CANCEL_CLICKED: 'Consent page cancel clicked',
  CONSENT_ERROR_RECEIVED: 'Consent error received',

  CONSENT_BUTTON_CLICKED: 'Consent button clicked',

  CONSENT_CONFIRMATION_BUTTON_CLICKED: 'Consent confirmation button clicked',
  CONSENT_CONFIRMATION_CANCEL_CLICKED: 'Consent confirmation cancel clicked',

  PRE_CONSENT_RESPONSE_RECEIVED: 'Pre consent response received',
  PRE_CONSENT_RESPONSE_ERROR_RECEIVED: 'Pre consent response error received',
  PRE_CONSENT_AUTHORIZATION_RESPONSE_RECEIVED: 'Pre consent authorization response received',
  PRE_CONSENT_AUTHORIZATION_ERROR_RECEIVED: 'Pre consent authorization error received',

  CONSENT_CALLBACK_REDIRECT_PAGE_LOADED: 'Consent callback redirect page loaded',
  CONSENT_CALLBACK_REDIRECT_ERROR_RECEIVED: 'Consent callback redirect error received',

  POST_CONSENT_AUTHORIZATION_RESPONSE_RECEIVED: 'Post consent authorization response received',
  POST_CONSENT_AUTHORIZATION_ERROR_RECEIVED: 'Post consent authorization error received',
  POST_CONSENT_REDIRECT_CALLED: 'Post consent redirect called',
};

export const AnalyticsAction = {
  OPEN: 'Open',
  CLICK: 'Click',
  CLOSE: 'Close',
  BACK: 'Back',
  LOAD: 'Load',
  NEXT: 'Next',
  RESET: 'Reset',
  SUBMIT: 'Submit',
};

interface ContextProps {
  track: (event: string, properties?: Record<string, string>) => void;
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
  onTrack?: (event: string, properties?: Record<string, string>) => void;
  children: ReactNode | ReactNode[];
}
/**
 * A generic analytics context provider.
 *
 * @param onTrack - Callback function to handle the components tracking calls
 *
 */
const AnalyticsProvider = ({ children, onTrack }: ProviderProps) => {
  const track = (event: string, properties?: Record<string, string>) => {
    if (onTrack) {
      onTrack(event, properties);
    } else {
      Logger.warn(
        'useAnalytics onTrack function is not set. To remove this warning please provide an onTrack function to the AnalyticsProvider',
      );

      Logger.debug(`useAnalytics track called with event '${event}'`);
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
