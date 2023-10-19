import { render, screen } from '@testing-library/react';
import App from './App(내가친코드)';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
