import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';

describe('Home Page', () => {
  test('renders without crashing', () => {
    
    // Check if the page header is rendered
    const headerElement = screen.getByText(/Articles Page/i);
    expect(headerElement).toBeInTheDocument();
    
    // Check if the loading state is shown
    const loadingElement = screen.getByText(/Loading articles.../i);
    expect(loadingElement).toBeInTheDocument();
  });
});