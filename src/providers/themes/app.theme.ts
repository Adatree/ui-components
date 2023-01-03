// MUI colour generator https://material.io/resources/color/

export enum ThemeMode {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export type AppTheme = {
  mode: ThemeMode;
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
  mode: ThemeMode.LIGHT,
  colour: {
    primary: '#48dfd2',
    secondary: '#021c55',
    backgrounds: {
      card: '#ffffff',
      hover: '#c8f5f1',
      inputs: '#ffffff',
      modal: '#f5f5f5',
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

export const darkTheme: AppTheme = {
  mode: ThemeMode.DARK,
  colour: {
    primary: '#48dfd2',
    secondary: '#021c55',
    backgrounds: {
      card: '#283461',
      hover: '#4a5271',
      inputs: '#283461',
      modal: '#1f294d',
      page: '#182039',
    },
    buttons: {
      background: '#48dfd2',
      text: '#000',
    },
    text: {
      main: '#f9f9f9',
      link: '#f6ca6e',
      highlight: '#48dfd2',
    },
  },
  font: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  },
};
