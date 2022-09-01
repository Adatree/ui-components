import { Copy } from '../../../../types/copy.type';

export const commonCopy = (): Copy['common'] => {
  return {
    accredited_recipient_label: 'Accredited Data Recipient:',
    adatree_name: 'Adatree',
    button_label_back: 'Back',
    button_label_finished: 'Done',
    button_label_no: 'No',
    button_label_yes: 'Yes',
    cdr_policy_label: 'CDR Policy',
    cdr_principal_label: 'Under CDR Principal:',
    fallback_data_holder_name: 'Your data provider',
    status_active_label: 'granted:',
    status_expired_label: 'expired:',
    status_requested_label: 'requested:',
    status_revoked_label: 'revoked:',
  };
};
