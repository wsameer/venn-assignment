import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { OnboardingForm } from './onboarding-form';

export const Onboarding = () => {
  return (
    <Card className="w-full max-w-full mx-auto md:max-w-xl md:mt-[100px] mb-10">
      <CardHeader>Onboarding Form</CardHeader>
      <CardContent>
        <OnboardingForm />
      </CardContent>
    </Card>
  );
};
