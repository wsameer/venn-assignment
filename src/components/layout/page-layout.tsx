import { Toaster } from '@/components/ui/sonner';
import React from 'react';

/**
 * A layout component that is full-width on mobile and constrained/centered
 * with vertical padding on medium screens and up.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children The content to display inside the layout.
 */
export const PageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full md:max-w-4xl md:mx-auto">
      <main className="md:py-12">{children}</main>
      <Toaster />
    </div>
  );
};
