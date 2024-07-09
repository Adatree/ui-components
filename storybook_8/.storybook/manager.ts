import { addons } from '@storybook/manager-api';
import Adatree from './theme';

addons.setConfig({
  theme: Adatree,
  sidebar: {
    filters: {
      hideItems: (item) => {
        if (
          item.id === 'full-examples-create-consent--with-insights-single' ||
          item.id === 'full-examples-create-consent--with-insights-many'
        ) {
          return false;
        }

        return true;
      },
    },
  },
});
