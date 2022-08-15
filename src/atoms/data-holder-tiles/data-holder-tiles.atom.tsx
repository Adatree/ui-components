import React from 'react';
import { Box } from '@mui/material';
import { DataHolder } from '../../generated/consent/api';

export type DataHolderTilesProps = {
  dataHolders: DataHolder[];
  onClick: (dataHolder: DataHolder) => void;
};

export const DataHolderTiles: React.FC<DataHolderTilesProps> = (props) => {
  const { dataHolders, onClick } = props;

  const handleClick = (dataHolder: DataHolder) => {
    onClick(dataHolder);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      {dataHolders.map((dataHolder) => {
        return (
          <Box
            sx={{ width: { xs: '50%', md: '25%' }, cursor: 'pointer', p: { xs: 1, sm: 2, md: 3 } }}
            onClick={() => handleClick(dataHolder)}
            key={dataHolder.dataHolderBrandId}
          >
            <img
              src={dataHolder.logoUri}
              alt={dataHolder.brandName}
              title={dataHolder.brandName}
              style={{ width: '100%' }}
            />
          </Box>
        );
      })}
    </Box>
  );
};
