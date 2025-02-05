import React from 'react';
import { Chip, Grid, useTheme } from '@mui/material';
import { DataHolder } from '@adatree/react-api-sdk-dashboard';
import { Card } from '../card/card.atom';

interface Props {
  dataHolders: DataHolder[];
  disableDataHolders: DataHolder[];
  onClick: (dataHolder: DataHolder) => void;
}

export const DataHolderTiles = (props: Props) => {
  const { dataHolders, disableDataHolders = [], onClick } = props;
  const theme = useTheme();

  let tileWidthXS = '50%';
  let tileWidthSM = '25%';
  let tileWidthMD = '20%';
  const tileWidthLG = '25%';

  let cardHeightXS = '45vw';
  let cardHeightSM = '16rem';

  if (dataHolders.length > 4) {
    tileWidthXS = '33%';
    tileWidthSM = '25%';
    tileWidthMD = '20%';
    cardHeightXS = '28vw';
    cardHeightSM = '12rem';
  }

  if (dataHolders.length === 6) {
    tileWidthXS = '33%';
    tileWidthSM = '33%';
    tileWidthMD = '16%';
    cardHeightXS = '28vw';
    cardHeightSM = '12rem';
  }

  if (dataHolders.length === 8) {
    tileWidthMD = '25%';
  }

  let titleBackground = '#fff';
  if (theme.palette.mode === 'dark') {
    titleBackground = '#dfdfdf';
  }

  const handleClick = (dataHolder: DataHolder, disabled: boolean) => {
    if (!disabled) {
      onClick(dataHolder);
    }
  };

  const isDisabled = (option: DataHolder): boolean => {
    if (disableDataHolders.some((dataHolder) => dataHolder.dataHolderBrandId === option.dataHolderBrandId)) {
      return true;
    }
    return false;
  };

  return (
    <Grid className="adt-container" container spacing={2}>
      {dataHolders.map((dataHolder) => {
        const disabled = isDisabled(dataHolder);
        return (
          <Grid
            className="adt-card"
            item
            sx={{
              cursor: 'pointer',
              position: 'relative',
              flexBasis: { xs: tileWidthXS, sm: tileWidthSM, md: tileWidthMD, lg: tileWidthLG },
            }}
            onClick={() => handleClick(dataHolder, disabled)}
            key={dataHolder.dataHolderBrandId}
          >
            <Card
              sx={{
                p: { xs: '4px', sm: '0.8rem', md: '1.6rem' },
                height: '100%',
                minHeight: { xs: cardHeightXS, sm: cardHeightSM },
                alignItems: 'center',
                display: 'flex',
                backgroundColor: titleBackground,
                '&:hover': {
                  backgroundColor: disabled === true ? titleBackground : (theme) => theme.palette.background_hover.main,
                  borderColor: disabled === true ? titleBackground : (theme) => theme.palette.background_hover.main,
                },
                '&:hover img': {
                  opacity: disabled === true ? '1' : '0.3 !important',
                },
              }}
            >
              <img
                src={dataHolder.logoUri}
                alt={dataHolder.brandName}
                title={dataHolder.brandName}
                style={{
                  width: '100%',
                  opacity: disabled === true ? '0.3' : '1',
                }}
              />
            </Card>

            {disabled && (
              <Chip
                sx={{
                  m: { xs: 1, sm: 2, md: 3 },
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: 'success.main',
                  color: 'common.white',
                  fontWeight: 600,
                  fontSize: '1.4rem',
                  textTransform: 'lowercase',
                  '& span:first-letter': {
                    textTransform: 'capitalize',
                  },
                }}
                label={'Active'}
                size="small"
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};
