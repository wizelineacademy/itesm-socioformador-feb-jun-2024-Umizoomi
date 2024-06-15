import '@testing-library/jest-dom'; 
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateTeamModal from '../components/Modals/CreateTeamModal';
import Comment from '@/components/comment_element/Comment';
import UserChart from '../components/UserChart/userchart';
import AddNewMember from '../components/UserChart/AddNewMember';
import Chat from '../components/UserChart/chat';
import NavigationButton from '../components/UserChart/navigationButton';
import SessionProvider, { SessionContext } from '../components/UserChart/session-provider';
import TeamMemberCard from '../components/UserChart/TeamMemberCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mocking fetch
global.fetch = jest.fn();

describe('Components Test Suite', () => {

  // CreateTeamModal Component Tests
  describe('CreateTeamModal component', () => {
    beforeEach(() => {
      render(<CreateTeamModal />);
    });

    test('Renderiza el elemento', () => {
      const createTeamButton = screen.getByRole('button', { name: /create a team/i });
      expect(createTeamButton).toBeInTheDocument();
    });

    test('Modal contains a form with the correct fields', () => {
      const createTeamButton = screen.getByRole('button', { name: /create a team/i });
      userEvent.click(createTeamButton);

      const teamNameInput = screen.getByLabelText(/team name/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      expect(teamNameInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    test('Form submission triggers the correct function', () => {
      const handleSubmit = jest.fn();
      render(<CreateTeamModal onSubmit={handleSubmit} />);
      
      const createTeamButton = screen.getByRole('button', { name: /create a team/i });
      userEvent.click(createTeamButton);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      userEvent.click(submitButton);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  // Comment Component Tests
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

    it('Renders multiple comments', () => {
      const comments = ['First comment', 'Second comment', 'Third comment'];
      render(comments.map(comment => <Comment key={comment} comment={comment} />));
      comments.forEach(comment => {
        expect(screen.getByText(comment)).toBeInTheDocument();
      });
    });

    it('Does not render an empty comment', () => {
      const { container } = render(<Comment comment="" />);
      expect(container.firstChild).toBeNull();
    });

    it('Allows editing a comment', () => {
      render(<Comment comment="Initial comment" />);
      
      const editButton = screen.getByRole('button', { name: /edit/i });
      userEvent.click(editButton);

      const commentInput = screen.getByDisplayValue('Initial comment');
      userEvent.clear(commentInput);
      userEvent.type(commentInput, 'Updated comment');
      
      const saveButton = screen.getByRole('button', { name: /save/i });
      userEvent.click(saveButton);

      expect(screen.getByText('Updated comment')).toBeInTheDocument();
    });

    it('Allows deleting a comment', () => {
      render(<Comment comment="Comment to delete" />);
      
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      userEvent.click(deleteButton);

      expect(screen.queryByText('Comment to delete')).not.toBeInTheDocument();
    });
  });

  // UserChart Component Tests
  describe('UserChart component', () => {
    test('UserChart component renders without crashing', () => {
      render(<UserChart />);
      const chart = screen.getByTestId('user-chart');
      expect(chart).toBeInTheDocument();
    });

    test('UserChart displays correct data', () => {
      const data = [{ name: 'User1', value: 100 }];
      render(<UserChart data={data} />);
      const user = screen.getByText('User1');
      const value = screen.getByText('100');
      expect(user).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });
  });

  // AddNewMember Component Tests
  describe('AddNewMember component', () => {
    test('AddNewMember form renders', () => {
      render(<AddNewMember />);
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });

    test('AddNewMember form submission works', () => {
      render(<AddNewMember />);
      const input = screen.getByLabelText(/name/i);
      fireEvent.change(input, { target: { value: 'New Member' } });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
      expect(screen.getByText('New Member')).toBeInTheDocument();
    });
  });

  // Chat Component Tests
  describe('Chat component', () => {
    test('Chat component renders with a message', () => {
      const message = 'Hello, this is a test message';
      render(<Chat message={message} />);
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    test('Chat component sends a new message', () => {
      render(<Chat />);
      const input = screen.getByPlaceholderText(/type a message/i);
      fireEvent.change(input, { target: { value: 'New Message' } });
      const sendButton = screen.getByRole('button', { name: /send/i });
      fireEvent.click(sendButton);
      expect(screen.getByText('New Message')).toBeInTheDocument();
    });
  });

  // NavigationButton Component Tests
  describe('NavigationButton component', () => {
    test('NavigationButton renders correctly', () => {
      render(<NavigationButton label="Navigate" />);
      const button = screen.getByRole('button', { name: /navigate/i });
      expect(button).toBeInTheDocument();
    });

    test('NavigationButton calls onClick handler', () => {
      const handleClick = jest.fn();
      render(<NavigationButton label="Navigate" onClick={handleClick} />);
      const button = screen.getByRole('button', { name: /navigate/i });
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // SessionProvider Component Tests
  describe('SessionProvider component', () => {
    test('SessionProvider provides session context', () => {
      render(
        <SessionProvider>
          <SessionContext.Consumer>
            {value => (
              <div>
                {value ? 'Session is available' : 'No session'}
              </div>
            )}
          </SessionContext.Consumer>
        </SessionProvider>
      );
      expect(screen.getByText('Session is available')).toBeInTheDocument();
    });
  });

  // TeamMemberCard Component Tests
  describe('TeamMemberCard component', () => {
    test('TeamMemberCard displays member details', () => {
      const member = { name: 'John Doe', role: 'Developer' };
      render(<TeamMemberCard member={member} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Developer')).toBeInTheDocument();
    });
  });
});
