import React from 'react';

type Props = {
  message?: string;
};

export const TypoError = ({ message }: Props) => {
  if (!message) return;
  return (
    <p className='className="text-sm text-destructive" role="alert"'>
      {message}
    </p>
  );
};
