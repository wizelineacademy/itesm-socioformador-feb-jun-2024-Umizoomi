import {render, screen} from '@testing-library/react';
import Home from "../../app/page"
import Chat from "@/app/components/chat"
import dashboard "../../app/dashboard"

describe('Home Component', () => {
    test('renders "Get started" paragraph', () => {
      render(<Home />);
      const paragraphElement = screen.getByText(/Get started by editing/i);
      expect(paragraphElement).toBeInTheDocument();
    });
  
    test('renders Vercel logo', () => {
      render(<Home />);
      const vercelLogo = screen.getByAltText('Vercel Logo');
      expect(vercelLogo).toBeInTheDocument();
    });
  
    test('renders all links', () => {
      render(<Home />);
      
      const docsLink = screen.getByRole('link', { name: /Docs/i });
      expect(docsLink).toBeInTheDocument();
      
      const learnLink = screen.getByRole('link', { name: /Learn/i });
      expect(learnLink).toBeInTheDocument();
      
      const templatesLink = screen.getByRole('link', { name: /Templates/i });
      expect(templatesLink).toBeInTheDocument();
      
      const deployLink = screen.getByRole('link', { name: /Deploy/i });
      expect(deployLink).toBeInTheDocument();
    });
  });

  describe('ChatContent Component', () => {
    test('renders "Sara AI" heading', () => {
      render(<Chat />);
      const headingElement = screen.getByText(/Sara AI/i);
      expect(headingElement).toBeInTheDocument();
    });
  
    test('renders input box and allows typing', () => {
      render(<Chat />);
      const inputElement = screen.getByPlaceholderText('Ask SaraAI ...');
      expect(inputElement).toBeInTheDocument();
      fireEvent.change(inputElement, { target: { value: 'Hello, SaraAI!' } });
      expect(inputElement).toHaveValue('Hello, SaraAI!');
    });
  
    test('adds a new user message to the messages list on form submission', async () => {
      render(<Chat />);
      
      const inputElement = screen.getByPlaceholderText('Ask SaraAI ...');
      const submitButton = screen.getByRole('button', { name: /send/i });
  
      
      fireEvent.change(inputElement, { target: { value: 'Hello, SaraAI!' } });
      expect(inputElement).toHaveValue('Hello, SaraAI!');
  
      
      fireEvent.click(submitButton);
  
      
      const userMessage = await screen.findByText('Hello, SaraAI!');
      expect(userMessage).toBeInTheDocument();
    });
  });

  describe('DashboardPage Component', () => {
    test('renders "Sign in" link when user is not authenticated', () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });
  
      render(<DashboardPage />);
      const signInLink = screen.getByText('Sign in');
      expect(signInLink).toBeInTheDocument();
      expect(signInLink.closest('a')).toHaveAttribute('href', '/api/auth/signin');
    });
  
    test('renders welcome message when user is authenticated', () => {
      (useSession as jest.Mock).mockReturnValue({
        data: {
          user: {
            name: 'John Doe',
          },
        },
        status: 'authenticated',
      });
  
      render(<DashboardPage />);
      const welcomeMessage = screen.getByText('Welcome Back, John Doe');
      expect(welcomeMessage).toBeInTheDocument();
    });
  
    test('renders UserFeedbackChart when user is authenticated', () => {
      (useSession as jest.Mock).mockReturnValue({
        data: {
          user: {
            name: 'John Doe',
          },
        },
        status: 'authenticated',
      });
  
      render(<DashboardPage />);
      const userFeedbackChart = screen.getByText('My Graph');
      expect(userFeedbackChart).toBeInTheDocument();
    });
  });