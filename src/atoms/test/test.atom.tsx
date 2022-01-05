import React from 'react';

export interface TestProps {
  text: string;
}

export const Accordion = (props: TestProps) => {
  const { text } = props;

  return <h1>{text}</h1>;
};
