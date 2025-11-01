import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepIndicator } from '@/components/step-indicator';

describe('StepIndicator', () => {
  it('renders the step indicator with correct text', () => {
    render(<StepIndicator currentStep={1} totalSteps={5} />);
    expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
  });

  it('displays correct step numbers for different props', () => {
    render(<StepIndicator currentStep={3} totalSteps={10} />);
    expect(screen.getByText('Step 3 of 10')).toBeInTheDocument();
  });

  it('handles currentStep of 0', () => {
    render(<StepIndicator currentStep={0} totalSteps={5} />);
    expect(screen.getByText('Step 0 of 5')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<StepIndicator currentStep={1} totalSteps={5} />);
    const textElement = screen.getByText('Step 1 of 5');
    expect(textElement).toHaveClass('text-sm', 'font-medium');
  });

  it('renders within a container with margin bottom', () => {
    const { container } = render(
      <StepIndicator currentStep={1} totalSteps={5} />,
    );
    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveClass('mb-4');
  });

  it('handles large step numbers', () => {
    render(<StepIndicator currentStep={999} totalSteps={1000} />);
    expect(screen.getByText('Step 999 of 1000')).toBeInTheDocument();
  });
});
