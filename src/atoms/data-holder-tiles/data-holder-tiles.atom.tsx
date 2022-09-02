import React from 'react';
import { Box, Chip } from '@mui/material';
import { DataHolder } from '../../generated/consent/api';
import { Card } from '../card/card.atom';

export type DataHolderTilesProps = {
  dataHolders: DataHolder[];
  disableDataHolders: DataHolder[];
  onClick: (dataHolder: DataHolder) => void;
};

export const DataHolderTiles: React.FC<DataHolderTilesProps> = (props) => {
  const { dataHolders, disableDataHolders = [], onClick } = props;

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
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly' }}>
      {dataHolders.map((dataHolder) => {
        const disabled = isDisabled(dataHolder);
        return (
          <Box
            sx={{
              width: '50%',
              maxWidth: '25rem',
              cursor: disabled === true ? 'default' : 'pointer',
              p: 0.5,
              position: 'relative',
              alignSelf: 'stretch',
            }}
            onClick={() => handleClick(dataHolder, disabled)}
            key={dataHolder.dataHolderBrandId}
          >
            <Card
              sx={{
                height: '100%',
                alignItems: 'center',
                display: 'flex',
                '&:hover': {
                  backgroundColor:
                    disabled === true
                      ? (theme) => theme.palette.background_card.main
                      : (theme) => theme.palette.background_hover.main,
                  borderColor:
                    disabled === true
                      ? (theme) => theme.palette.background_card.main
                      : (theme) => theme.palette.background_hover.main,
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
          </Box>
        );
      })}
    </Box>
  );
};
