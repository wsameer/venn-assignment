import { Toaster } from '@/components/ui/sonner';
import React from 'react';

export const PageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full md:max-w-4xl md:mx-auto">
      <main className="md:py-12">{children}</main>
      <Toaster
        toastOptions={{
          classNames: {
            description: '!text-black',
          },
        }}
      />
    </div>
  );
};
