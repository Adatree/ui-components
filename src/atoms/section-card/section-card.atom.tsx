import React, { ReactElement } from 'react';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import { Tooltip } from '../tooltip/tooltip.atom';

export type SectionCardProps = {
  title: string;
  subtitle: string;
  content: ReactElement;
  tooltip?: ReactElement | string;
};
export const SectionCard: React.FC<SectionCardProps> = (props) => {
  const { title, subtitle, content, tooltip } = props;

  return (
    <>
      <Typography variant="h2" sx={{ mb: 3 }}>
        {title ? title : <Skeleton />}
      </Typography>

      {subtitle ? (
        <Box sx={{ mb: 4, display: 'flex' }}>
          <Typography>{subtitle}</Typography>
          {tooltip && <Tooltip content={tooltip} />}
        </Box>
      ) : (
        <Skeleton sx={{ mb: 4 }} variant="text" />
      )}

      {content ? (
        <Card>
          <CardContent>{content}</CardContent>
        </Card>
      ) : (
        <Skeleton variant="rectangular" height={200} />
      )}
    </>
  );
};
