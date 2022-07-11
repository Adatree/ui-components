import React, { ReactNode, useState } from 'react';
import { Typography, Box, Collapse } from '@mui/material';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import Circle from 'mdi-material-ui/Circle';

export type AccordionBasicProps = {
  title: string;
  children: ReactNode;
};

export const AccordionBasic: React.FC<AccordionBasicProps> = (props) => {
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        onClick={toggleAccordion}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'hover.main' },
        }}
      >
        <Typography variant="body2" sx={{ ml: '26px' }}>
          <Circle color={'cta'} sx={{ fontSize: '8px', mx: 1, ml: '-16px' }} />
          {title}
        </Typography>
        <ChevronDown
          className={isOpen ? 'open' : 'close'}
          sx={{
            '&.open': {
              transform: 'rotate(180deg)',
              transition: 'transform 0.2s',
            },
            '&.close': {
              transform: 'rotate(0deg)',
              transition: 'transform 0.2s',
            },
          }}
        />
      </Box>
      <Collapse in={isOpen}>
        <Box sx={{ p: 2 }}>{children} </Box>
      </Collapse>
    </>
  );
};
