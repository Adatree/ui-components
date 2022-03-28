import React, { ReactElement } from 'react';
import { Tooltip as MuiTooltip, Typography } from '@mui/material';
import InfoIcon from 'mdi-material-ui/InformationOutline';

export type TooltipProps = {
  content: ReactElement | string;
  title?: ReactElement;
};
export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { content, title } = props;
  const text = typeof content === 'string' ? <Typography>{content}</Typography> : content;
  const body = title ? title : <InfoIcon sx={{ ml: 1, pb: '2px', cursor: 'pointer', color: '#08A4E4' }} />;

  return (
    <>
      <MuiTooltip
        title={text}
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: 'tooltip.light',
              border: '1px solid',
              borderColor: 'tooltip.dark',
              color: 'tooltip.main',
            },
          },
        }}
      >
        {body}
      </MuiTooltip>
    </>
  );
};
