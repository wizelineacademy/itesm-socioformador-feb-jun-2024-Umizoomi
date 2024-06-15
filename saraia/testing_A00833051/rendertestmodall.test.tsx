import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Importante para los matchers de jest-dom
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


global.fetch = jest.fn();

describe('Avatar Component Tests', () => {
  // Prueba 1
  test('Avatar renders without crashing', () => {
    render(<Avatar />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  // Prueba 2
  test('Avatar applies custom className', () => {
    render(<Avatar className="custom-avatar" />);
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveClass('custom-avatar');
  });

  // Prueba 3
  test('AvatarImage renders without crashing', () => {
    render(<AvatarImage src="avatar.jpg" alt="Avatar" />);
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });

  // Prueba 4
  test('AvatarImage applies custom className', () => {
    render(<AvatarImage src="avatar.jpg" alt="Avatar" className="custom-image" />);
    const image = screen.getByAltText('Avatar');
    expect(image).toHaveClass('custom-image');
  });

  // Prueba 5
  test('AvatarFallback renders without crashing', () => {
    render(<AvatarFallback>Fallback Content</AvatarFallback>);
    expect(screen.getByText('Fallback Content')).toBeInTheDocument();
  });

  // Prueba 6
  test('AvatarFallback applies custom className', () => {
    render(<AvatarFallback className="custom-fallback">Fallback Content</AvatarFallback>);
    const fallback = screen.getByText('Fallback Content');
    expect(fallback).toHaveClass('custom-fallback');
  });

  // Prueba 7
  test('Avatar renders with default size', () => {
    render(<Avatar />);
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveStyle('height: 10px');
    expect(avatar).toHaveStyle('width: 10px');
  });

  // Prueba 8
  test('Avatar renders with custom size', () => {
    render(<Avatar style={{ height: '20px', width: '20px' }} />);
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveStyle('height: 20px');
    expect(avatar).toHaveStyle('width: 20px');
  });

  // Prueba 9
  test('AvatarFallback renders with default background color', () => {
    render(<AvatarFallback />);
    const fallback = screen.getByTestId('avatar-fallback');
    expect(fallback).toHaveClass('bg-muted');
  });

  // Prueba 10
  test('AvatarFallback renders with custom background color', () => {
    render(<AvatarFallback style={{ backgroundColor: 'blue' }}>Fallback Content</AvatarFallback>);
    const fallback = screen.getByText('Fallback Content');
    expect(fallback).toHaveStyle('background-color: blue');
  });
});
