import {
  createTheme as MuiCreateTheme,
  SimplePaletteColorOptions,
  Theme,
  ThemeOptions,
  darken,
  lighten,
} from '@mui/material';
import { AppTheme } from './app.theme';

const scalingFactor = 8;
const baseHtmlFontSize = 10;

const generatePaletteColor = (hexColour: string, contrastTextColour?: string): SimplePaletteColorOptions => {
  const paletteColor = {
    light: lighten(hexColour, 0.1),
    main: hexColour,
    dark: darken(hexColour, 0.1),
  };

  if (contrastTextColour) {
    return { ...paletteColor, contrastText: contrastTextColour };
  }
  return paletteColor;
};

export const CreateTheme = (appTheme: AppTheme, extendTheme?: Partial<ThemeOptions>): Theme => {
  const fontFamilyBase = appTheme.font.fontFamily;

  let fontFamilyHeadings = appTheme.font.fontFamily;
  if (appTheme.font.fontFamilyHeadings) {
    fontFamilyHeadings = appTheme.font.fontFamilyHeadings;
  }

  let buttonBorderRadius = '4px';
  if (appTheme.components?.button?.borderRadius) {
    buttonBorderRadius = appTheme.components?.button?.borderRadius;
  }

  const baseTheme: ThemeOptions = {
    palette: {
      mode: appTheme.mode === 'DARK' ? 'dark' : 'light',
      primary: generatePaletteColor(appTheme.colour.primary),
      secondary: generatePaletteColor(appTheme.colour.secondary),
      background_card: generatePaletteColor(appTheme.colour.backgrounds.card),
      background_hover: generatePaletteColor(appTheme.colour.backgrounds.hover),
      background_inputs: generatePaletteColor(appTheme.colour.backgrounds.inputs),
      background_modal: generatePaletteColor(appTheme.colour.backgrounds.modal),
      background_page: generatePaletteColor(appTheme.colour.backgrounds.page),
      button: generatePaletteColor(appTheme.colour.buttons.background, appTheme.colour.buttons.text),
      text_main: generatePaletteColor(appTheme.colour.text.main),
      text_link: generatePaletteColor(appTheme.colour.text.link),
      text_highlight: generatePaletteColor(appTheme.colour.text.highlight),
      background: {
        default: appTheme.colour.backgrounds.modal,
        paper: appTheme.colour.backgrounds.card,
      },
      hover: generatePaletteColor(appTheme.colour.hover ?? '#C4F4F0'),
      disable: generatePaletteColor(appTheme.colour.hover ?? '#f5f5f5'),
    },
    typography: {
      fontFamily: fontFamilyBase,

      // Set the HTML Base font size (px)
      // Useful to set the 10px simplification, remember to set "font-size:62.5%" on the html element
      // https://www.sitepoint.com/understanding-and-using-rem-units-in-css/
      htmlFontSize: baseHtmlFontSize,

      allVariants: {
        color: appTheme.colour.text.main,
      },

      h1: {
        fontFamily: fontFamilyHeadings,
        fontSize: '3rem',
        fontWeight: 300,
        letterSpacing: '0',
        lineHeight: '1.1',
      },
      h2: {
        fontFamily: fontFamilyHeadings,
        fontSize: '2.4rem',
        letterSpacing: '0.07px',
        lineHeight: '1.4',
      },
      h3: {
        fontFamily: fontFamilyHeadings,
        fontSize: '2.2rem',
        fontWeight: 300,
        letterSpacing: '0.07px',
        lineHeight: '1.6',
      },
      h4: {
        fontFamily: fontFamilyHeadings,
        fontSize: '2.0rem',
        fontWeight: 300,
        letterSpacing: '0.07px',
        lineHeight: '1.5',
      },
      h5: {
        fontFamily: fontFamilyHeadings,
        fontSize: '1.8rem',
        fontWeight: 300,
        letterSpacing: '0.07px',
        lineHeight: '1.5',
      },
      h6: {
        fontFamily: fontFamilyHeadings,
        fontSize: '1.7rem',
        fontWeight: 400,
        letterSpacing: '0.07px',
        lineHeight: '1.5',
      },
      body1: {
        fontSize: '1.6rem',
        letterSpacing: '0.1px',
        lineHeight: '1.4',
      },
      body2: {
        fontSize: '1.4rem',
        lineHeight: '1.5',
        letterSpacing: '0.3px',
      },
      subtitle1: {
        fontSize: '1.4rem',
        letterSpacing: '0.1px',
        lineHeight: '1.4',
        color: lighten(appTheme.colour.text.main, 0.3),
      },
      subtitle2: {
        fontSize: '1.2rem',
        letterSpacing: '0.1px',
        lineHeight: '1.4',
        color: lighten(appTheme.colour.text.main, 0.3),
      },
    },
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          option: {
            '&.Mui-focused': { backgroundColor: appTheme.colour.backgrounds.hover + ' !important' },
            '&[aria-selected="true"].Mui-focused': {
              backgroundColor: appTheme.colour.backgrounds.hover + ' !important',
            },
          },
          paper: {
            backgroundColor: appTheme.colour.backgrounds.inputs,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
            borderRadius: buttonBorderRadius,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
          },
        },
      },
    },

    // Set the spacing scaling factor (px)
    // Uses the baseHtmlFontSize, example
    // ( scalingFactor / baseHtmlFontSize) * factor = X rem
    // ( 8 / 10 ) * 1 = 0.8rem (8px since baseHtmlFontSize is 10)
    // ( 8 / 16 ) * 1 = 0.5rem (8px since baseHtmlFontSize is 16)
    spacing: (factor: number) => `${((scalingFactor / baseHtmlFontSize) * 10 * factor) / 10}rem`, // * 10 and / 10 to avoid JS IEEE 754 encoding error
  };

  let theme = baseTheme;

  if (extendTheme) {
    theme = {
      ...baseTheme,
      ...extendTheme,
      mixins: { ...baseTheme.mixins, ...extendTheme.mixins },
      components: { ...baseTheme.components, ...extendTheme.components },
      palette: { ...baseTheme.palette, ...extendTheme.palette },
      transitions: { ...baseTheme.transitions, ...extendTheme.transitions },
      typography: { ...baseTheme.typography, ...extendTheme.typography },
      zIndex: { ...baseTheme.zIndex, ...extendTheme.zIndex },
    };
  }

  return MuiCreateTheme(theme);
};

declare module '@mui/material/styles' {
  interface Palette {
    background_card: Palette['primary'];
    background_hover: Palette['primary'];
    background_inputs: Palette['primary'];
    background_modal: Palette['primary'];
    background_page: Palette['primary'];
    button: Palette['primary'];
    text_main: Palette['primary'];
    text_link: Palette['primary'];
    text_highlight: Palette['primary'];
    hover: Palette['primary'];
    disable: Palette['primary'];
  }
  interface PaletteOptions {
    background_card?: PaletteOptions['primary'];
    background_hover?: PaletteOptions['primary'];
    background_inputs?: PaletteOptions['primary'];
    background_modal?: PaletteOptions['primary'];
    background_page?: PaletteOptions['primary'];
    button?: PaletteOptions['primary'];
    text_main?: PaletteOptions['primary'];
    text_link?: PaletteOptions['primary'];
    text_highlight?: PaletteOptions['primary'];
    hover?: PaletteOptions['primary'];
    disable?: PaletteOptions['primary'];
  }
}

// Update the element's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    button: true;
  }
}

declare module '@mui/lab/LoadingButton' {
  interface ButtonPropsColorOverrides {
    button: true;
  }
}

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    button: true;
  }
}

declare module '@mui/material/Radio' {
  interface RadioPropsColorOverrides {
    button: true;
  }
}

declare module '@mui/material/Switch' {
  interface SwitchPropsColorOverrides {
    button: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    button: true;
  }
}
