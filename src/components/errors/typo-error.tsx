type Props = {
  message?: string;
};

export const TypoError = ({ message }: Props) => {
  if (!message) return;
  return (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
};
