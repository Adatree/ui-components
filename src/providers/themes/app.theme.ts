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
  };
};

export const defaultTheme: AppTheme = {
  colour: {
    primary: '#48DFD2',
    secondary: '#021C55',
    backgrounds: {
      card: '#FFFFFF',
      hover: '#C8F5F1',
      inputs: '#FFFFFF',
      modal: '#F8F8F8',
      page: '#EBEBEB',
    },
    buttons: {
      background: '#48DFD2',
      text: '#212121',
    },
    text: {
      main: '#212121',
      link: '#1A0DAB',
      highlight: '#1D50BF',
    },
  },
  font: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  },
};
