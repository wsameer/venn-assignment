type Props = {
  currentStep: number;
  totalSteps: number;
};

export const StepIndicator = ({ totalSteps, currentStep }: Props) => {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium">{`Step ${currentStep} of ${totalSteps}`}</p>
    </div>
  );
};
