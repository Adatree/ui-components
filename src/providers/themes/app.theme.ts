// MUI colour generator https://material.io/resources/color/

export type AppTheme = {
  colour: {
    primary: string;
    secondary: string;
    backgrounds: {
      card: string;
      hover: string;
      inputs: string;
      modal: string;
      page: string;
    };
    buttons: {
      background: string;
      text: string;
    };
    text: {
      main: string;
      link: string;
      highlight: string;
    };
  };
  font: {
    fontFamily: string;
    fontFamilyHeadings?: string;
  };
};

export const defaultTheme: AppTheme = {
  colour: {
    primary: '#48dfd2',
    secondary: '#021c55',
    backgrounds: {
      card: '#ffffff',
      hover: '#c8f5f1',
      inputs: '#ffffff',
      modal: '#f8f8f8',
      page: '#ebebeb',
    },
    buttons: {
      background: '#48dfd2',
      text: '#212121',
    },
    text: {
      main: '#212121',
      link: '#1a0dab',
      highlight: '#1d50bf',
    },
  },
  font: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  },
};
