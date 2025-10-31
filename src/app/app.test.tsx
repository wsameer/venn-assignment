import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { App } from './index';

describe('App', () => {
  it('renders the App component', () => {
    const { container } = render(<App />);

    expect(container).toBeDefined();
  });
});
