import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { OnboardingForm } from './onboarding-form';

export const Onboarding = () => {
  return (
    <Card className="w-full max-w-full mx-auto md:max-w-xl my-8 md:my-16">
      <CardHeader>Onboarding Form</CardHeader>
      <CardContent>
        <OnboardingForm />
      </CardContent>
    </Card>
  );
};
