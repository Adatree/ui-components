import { ReactElement } from 'react';

export interface Copy {
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
    };
    edit: {
      scope_additional_label: ReactElement;
      scope_removal_label: string | ReactElement;
    };
  };
}
