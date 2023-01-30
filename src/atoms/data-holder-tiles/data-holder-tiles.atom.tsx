import React from 'react';
import { Chip, Grid, useTheme } from '@mui/material';
import { DataHolder } from '../../generated/consent/api';
import { Card } from '../card/card.atom';

export type DataHolderTilesProps = {
  dataHolders: DataHolder[];
  disableDataHolders: DataHolder[];
  onClick: (dataHolder: DataHolder) => void;
};

export const DataHolderTiles: React.FC<DataHolderTilesProps> = (props) => {
  const { dataHolders, disableDataHolders = [], onClick } = props;
  const theme = useTheme();

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
            sx={{ cursor: 'pointer', position: 'relative' }}
            onClick={() => handleClick(dataHolder, disabled)}
            key={dataHolder.dataHolderBrandId}
          >
            <Card
              sx={{
                height: '100%',
                minHeight: { xs: '45vw', sm: '16rem' },
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
