import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';

describe('Avatar Component Tests', () => {
  // Prueba 1: Renderización del Avatar sin errores
  test('Avatar renders without crashing', () => {
    render(<Avatar />);
    const avatarElement = screen.getByRole('img');
    expect(avatarElement).toBeInTheDocument();
  });

  // Prueba 2: Verificación de la clase principal del Avatar
  test('Avatar renders with correct base class', () => {
    render(<Avatar />);
    const avatarElement = screen.getByRole('img');
    expect(avatarElement).toHaveClass('relative');
    expect(avatarElement).toHaveClass('flex');
    expect(avatarElement).toHaveClass('h-10');
    expect(avatarElement).toHaveClass('w-10');
    expect(avatarElement).toHaveClass('shrink-0');
    expect(avatarElement).toHaveClass('overflow-hidden');
    expect(avatarElement).toHaveClass('rounded-full');
  });

  // Prueba 3: Renderización del AvatarImage
  test('AvatarImage renders correctly', () => {
    render(<Avatar><AvatarImage src="/avatar.jpg" alt="Avatar" /></Avatar>);
    const avatarImage = screen.getByRole('img');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveClass('aspect-square');
    expect(avatarImage).toHaveClass('h-full');
    expect(avatarImage).toHaveClass('w-full');
  });

  // Prueba 4: Renderización del AvatarFallback
  test('AvatarFallback renders correctly', () => {
    render(<Avatar><AvatarFallback /></Avatar>);
    const avatarFallback = screen.getByTestId('avatar-fallback');
    expect(avatarFallback).toBeInTheDocument();
    expect(avatarFallback).toHaveClass('flex');
    expect(avatarFallback).toHaveClass('h-full');
    expect(avatarFallback).toHaveClass('w-full');
    expect(avatarFallback).toHaveClass('items-center');
    expect(avatarFallback).toHaveClass('justify-center');
    expect(avatarFallback).toHaveClass('rounded-full');
    expect(avatarFallback).toHaveClass('bg-muted');
  });

  // Prueba 5: Comprobación de las propiedades de accesibilidad en AvatarImage
  test('AvatarImage accessibility properties', () => {
    render(<Avatar><AvatarImage src="/avatar.jpg" alt="Avatar" /></Avatar>);
    const avatarImage = screen.getByRole('img');
    expect(avatarImage).toHaveAttribute('src', '/avatar.jpg');
    expect(avatarImage).toHaveAttribute('alt', 'Avatar');
  });

  // Prueba 6: Comprobación de las propiedades de accesibilidad en AvatarFallback
  test('AvatarFallback accessibility properties', () => {
    render(<Avatar><AvatarFallback /></Avatar>);
    const avatarFallback = screen.getByTestId('avatar-fallback');
    expect(avatarFallback).toHaveAttribute('aria-busy', 'true');
    expect(avatarFallback).toHaveAttribute('aria-live', 'polite');
  });

  // Prueba 7: AvatarImage y AvatarFallback se muestran correctamente juntos
  test('Avatar renders AvatarImage and AvatarFallback correctly', () => {
    render(<Avatar><AvatarImage src="/avatar.jpg" alt="Avatar" /><AvatarFallback /></Avatar>);
    const avatarImage = screen.getByRole('img');
    const avatarFallback = screen.getByTestId('avatar-fallback');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarFallback).toBeInTheDocument();
  });

  // Prueba 8: Verificación de las clases personalizadas en AvatarImage
  test('AvatarImage renders with custom class', () => {
    render(<Avatar><AvatarImage src="/avatar.jpg" alt="Avatar" className="custom-avatar-image" /></Avatar>);
    const avatarImage = screen.getByRole('img');
    expect(avatarImage).toHaveClass('custom-avatar-image');
  });

  // Prueba 9: Verificación de las clases personalizadas en AvatarFallback
  test('AvatarFallback renders with custom class', () => {
    render(<Avatar><AvatarFallback className="custom-avatar-fallback" /></Avatar>);
    const avatarFallback = screen.getByTestId('avatar-fallback');
    expect(avatarFallback).toHaveClass('custom-avatar-fallback');
  });

  // Prueba 10: AvatarFallback se renderiza correctamente si no se proporciona AvatarImage
  test('AvatarFallback renders when AvatarImage is not provided', () => {
    render(<Avatar><AvatarFallback /></Avatar>);
    const avatarFallback = screen.getByTestId('avatar-fallback');
    expect(avatarFallback).toBeInTheDocument();
  });
});
