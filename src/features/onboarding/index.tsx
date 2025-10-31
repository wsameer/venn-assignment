import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { OnboardingForm } from './onboarding-form';

export const Onboarding = () => {
  return (
    <Card className="w-full max-w-sm md:m-[100px]">
      <CardHeader>Onboarding Form</CardHeader>
      <CardContent>
        <OnboardingForm />
      </CardContent>
    </Card>
  );
};
