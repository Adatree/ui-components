import { ReactElement } from 'react';
import { DataRecipient } from './data-recipient.type';

export interface Copy {
  common: {
    accredited_recipient_label: string;
    adatree_name: string;
    button_label_back: string;
    button_label_finished: string;
    button_label_next: string;
    button_label_no: string;
    button_label_yes: string;
    cdr_policy_label: string;
    cdr_principal_label: string;
    fallback_data_holder_name: string;
    status_active_label: string;
    status_expired_label: string;
    status_requested_label: string;
    status_revoked_label: string;
  };
  consent: {
    create: {
      cancel_label: string;
      cancel_consent_message: string;
      cancel_edit_message: string;
      consent_label: string;
      data_holder_input_label: string;
      select_favourite_data_holder_title: string;
      select_more_data_holder_title: string;
      save_label: string;
      title: (name: string) => ReactElement;
      data_handler_label: string;
    };
    details: {
      data_disclosure_label: string;
      data_disclosure_message: string;
    };
    edit: {
      active_consent_message: string;
      non_active_consent_message: (status: string) => string;
      scope_additional_message: ReactElement;
      scope_create_message: ReactElement;
      scope_read_only_message: ReactElement;
      scope_remove_message: ReactElement;
      up_to_date_message: string;
    };
    scope: {
      tooltip_label: ReactElement;
    };
  };
  component: {
    blocked_dataholder: {
      message: (name: string) => ReactElement;
      reason: (name: string) => ReactElement;
      action: (name: string) => ReactElement;
    };
    data_handling_info: {
      list_data_policy: (name: string, dataHandlingPolicy?: string) => ReactElement;
      list_non_adr_disclaimer: (name: string) => ReactElement;
      title: string;
    };
    general_information: {
      list_adr_context: string;
      list_cdr_protection: string;
      list_complaint: ReactElement;
      list_deleted: string;
      list_marketing: (dataRecipientName: string) => string;
      list_primary_more_info: ReactElement;
      list_records: ReactElement;
      list_revoked: string;
      list_security: (dataRecipientName: string) => string;
      list_sharing: ReactElement;
      list_tasp_context: (taspDataRecipient: DataRecipient) => string;
      list_third_party_more_info: (dataHolderName: string, cdrPolicyUrl: string) => ReactElement;
      title: string;
    };
    max_account_connected_message: {
      list_label: string;
      list_item: (useCaeName: string, dataHolderName: string) => string;
      sub_title: string;
      title: string;
    };
    partner_message: {
      discreet_label: string;
      what_label: ReactElement;
      why_label: (dataHolderName: string) => ReactElement;
    };
  };
  error: {
    required: string;
  };
}
