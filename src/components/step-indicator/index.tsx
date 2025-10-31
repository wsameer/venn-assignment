type Props = {
  currentStep: number;
  totalSteps: number;
};

export const StepIndicator = ({ totalSteps, currentStep }: Props) => {
  return (
    <div className="mb-8">
      <p className="text-sm font-medium">{`Step ${currentStep ?? 0} of ${totalSteps ?? 0}`}</p>
    </div>
  );
};
