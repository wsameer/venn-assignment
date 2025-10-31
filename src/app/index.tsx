import { PageLayout } from '@/components/layout/page-layout';
import { AppProvider } from './provider';
import { StepIndicator } from '@/components/step-indicator';
import { Onboarding } from '@/features/onboarding';

export const App = () => {
  return (
    <AppProvider>
      <PageLayout>
        <div className="bg-gray-100 p-6 md:p-8 text-center">
          <StepIndicator currentStep={1} totalSteps={5} />
          <Onboarding />
        </div>
      </PageLayout>
    </AppProvider>
  );
};
