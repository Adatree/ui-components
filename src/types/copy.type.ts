import { ReactElement } from 'react';

export interface Copy {
  common: {
    accredited_recipient_label: string;
    adatree_name: string;
    button_label_back: string;
    button_label_finished: string;
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
      data_holder_general_information_list_item: string;
      select_favourite_data_holder_title: string;
      select_more_data_holder_title: string;
      save_label: string;
      title: (name: string) => ReactElement;
      data_handler_label: string;
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
    data_handling_info: {
      list_data_policy: (name: string, dataPolicyUrl: string) => ReactElement;
      list_protection_framework: (dataHandlerName: string, protectionFrameworkUrl: string) => ReactElement;
      title: string;
    };
    general_information: {
      list_complaint: (complaintEmail: string) => ReactElement;
      list_deleted: string;
      list_marketing: string;
      list_more: (cdrPolicyText: string, cdrPolicyUrl: string) => ReactElement;
      list_records: string;
      list_revoked: string;
      list_security: string;
      list_sharing: string;
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
