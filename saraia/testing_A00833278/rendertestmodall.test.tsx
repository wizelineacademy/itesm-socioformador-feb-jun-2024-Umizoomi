
import '@testing-library/jest-dom'; 
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateTeamModal from '../components/Modals/CreateTeamModal';
import Comment from '@/components/comment_element/Comment';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mocking fetch
global.fetch = jest.fn();

describe('CreateTeamModal component', () => {
  beforeEach(() => {
    render(<CreateTeamModal />);
  });

  test('Renderiza el elemento', () => {
    const createTeamButton = screen.getByRole('button', { name: /create a team/i });
    expect(createTeamButton).toBeInTheDocument();
  });

});
describe('Comments', () => {
  const testComment = 'This is a test comment';

  it('Renderizacion', () => {
    render(<Comment comment={testComment} />);
  });

  it('Displays message', () => {
    const { getByText } = render(<Comment comment={testComment} />);
    expect(getByText(testComment)).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    const { container } = render(<Comment comment={testComment} />);
    const commentDiv = container.firstChild;
    
    expect(commentDiv).toHaveClass('rounded-lg');
    expect(commentDiv).toHaveClass('p-4');
    expect(commentDiv).toHaveClass('border');
    expect(commentDiv).toHaveClass('border-gray-200');
    expect(commentDiv).toHaveClass('mb-4');
    expect(commentDiv).toHaveClass('flex');
    expect(commentDiv).toHaveClass('flex-col');
    expect(commentDiv).toHaveClass('gap-3');
  });
});


describe('Input component', () => {
  const testProps = {
    type: 'text',
    placeholder: 'Enter your text here',
    className: 'custom-class',
  };

  it('renders', () => {
    render(<Input {...testProps} />);
  });

  it('passes props correctly', () => {
    const { getByPlaceholderText } = render(<Input {...testProps} />);
    const inputElement = getByPlaceholderText(testProps.placeholder);
    
    expect(inputElement).toHaveAttribute('type', testProps.type);
    expect(inputElement).toHaveClass('custom-class');
  });

  it('applies the correct tailwlind classes', () => {
    const { container } = render(<Input {...testProps} />);
    const inputElement = container.firstChild;

    expect(inputElement).toHaveClass('flex');
    expect(inputElement).toHaveClass('h-10');
    expect(inputElement).toHaveClass('w-full');
    expect(inputElement).toHaveClass('rounded-md');
    expect(inputElement).toHaveClass('border');
    expect(inputElement).toHaveClass('bg-white');
    expect(inputElement).toHaveClass('px-3');
    expect(inputElement).toHaveClass('py-2');
    expect(inputElement).toHaveClass('text-sm');
  });
});


describe('Label component', () => {
  const testProps = {
    htmlFor: 'test-input',
    className: 'custom-class',
    disabled: true,
  };

  it('renders ', () => {
    render(<Label {...testProps}>Test Label</Label>);
  });

  it('passes  props correctly', () => {
    const { getByText } = render(<Label {...testProps}>Test Label</Label>);
    const labelElement = getByText('Test Label');

    expect(labelElement).toHaveAttribute('for', testProps.htmlFor);
    expect(labelElement).toHaveClass('custom-class');
    expect(labelElement).toHaveClass('peer-disabled:cursor-not-allowed');
    expect(labelElement).toHaveClass('peer-disabled:opacity-70');
  });

  it('applies the correct classes', () => {
    const { container } = render(<Label {...testProps}>Test Label</Label>);
    const labelElement = container.firstChild;

    expect(labelElement).toHaveClass('text-sm');
    expect(labelElement).toHaveClass('font-medium');
    expect(labelElement).toHaveClass('leading-none');

    expect(labelElement).toHaveClass('peer-disabled:cursor-not-allowed');
    expect(labelElement).toHaveClass('peer-disabled:opacity-70');
  });
});