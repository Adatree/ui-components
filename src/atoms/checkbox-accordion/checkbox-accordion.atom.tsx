import React, { useState } from 'react';
import { Card, CardContent, FormControlLabel, FormGroup, Link, Checkbox, Typography, Box } from '@mui/material';

export type CheckboxAccordionProps = {
  title: string;
  checkboxValue: string;
  checked?: boolean;
  items?: string[];
  subtitle?: string;
  openLabel?: string;
  closeLabel?: string;
  onChange: (isChecked: boolean, value: string) => void;
};

export const CheckboxAccordion: React.FC<CheckboxAccordionProps> = (props) => {
  const {
    title,
    subtitle,
    checkboxValue,
    checked = false,
    items,
    openLabel = `See what's included`,
    closeLabel = 'Hide',
    onChange,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const toggleAccordion = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange(event.target.checked, event.target.value);
  };

  return (
    <Card>
      <CardContent sx={{ pl: 1 }}>
        <FormGroup>
          <FormControlLabel
            label={<Typography variant="h3">{title}</Typography>}
            labelPlacement="start"
            sx={{
              justifyContent: 'space-between',
              ml: 0,
              pl: 1,
              '&:hover': { backgroundColor: 'highlight.light' },
            }}
            control={
              <Checkbox
                value={checkboxValue}
                checked={isChecked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
          />
        </FormGroup>

        {subtitle && (
          <Typography sx={{ pl: 1 }} variant="h4">
            {subtitle}
          </Typography>
        )}

        {items && items.length > 0 && (
          <Box sx={{ pl: 1 }}>
            <Link href="#" onClick={toggleAccordion} sx={{ display: 'block', mt: 3 }} color="inherit">
              {isOpen ? closeLabel : openLabel}
            </Link>
            {isOpen && (
              <Box sx={{ pt: 2 }}>
                <ul>
                  {items.map((item: string, i: number) => (
                    <li key={i} style={{ listStyle: 'inside', paddingLeft: '12px' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
