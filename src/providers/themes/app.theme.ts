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
    hover?: string;
    disable?: string;
  };
  components?: {
    button?: {
      borderRadius?: string;
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
    hover: '#C4F4F0',
    disable: '#f5f5f5',
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
      card: '#272728',
      hover: '#30353d',
      inputs: '#272728',
      modal: '#1B1D21',
      page: '#151619',
    },
    buttons: {
      background: '#48dfd2',
      text: '#000',
    },
    text: {
      main: '#d6d6d6',
      link: '#f6ca6e',
      highlight: '#43484f',
    },
    hover: '#43484f',
    disable: '#151619',
  },
  font: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  },
};
