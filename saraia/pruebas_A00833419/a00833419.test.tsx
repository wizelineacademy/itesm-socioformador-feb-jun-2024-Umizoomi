import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import AddNewMember from '../components/AddNewMember';

// Mock fetch globally
global.fetch = jest.fn();

// Mock Response globally
global.Response = class {
  constructor(body, options) {
    this.body = body;
    this.options = options;
    this.ok = options.status >= 200 && options.status < 300;
  }
  json() {
    return Promise.resolve(JSON.parse(this.body));
  }
};

describe('AddNewMember component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    act(() => {
      render(<AddNewMember teamId={123} />);
    });
  });

  it('initializes state correctly', () => {
    act(() => {
      const { getByText } = render(<AddNewMember teamId={123} />);
      expect(getByText('Select user...')).toBeInTheDocument();
    });
  });

  it('fetches users successfully', async () => {
    // Simulate successful fetch call
    global.fetch.mockResolvedValueOnce(new Response(JSON.stringify({ rows: [] }), { status: 200 }));

    act(() => {
      render(<AddNewMember teamId={123} />);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/getusersforteam');
    });
  });

  it('adds a member successfully', async () => {
    // Simulate successful fetch call for adding a member
    global.fetch.mockResolvedValueOnce(new Response(null, { status: 200 }));

    act(() => {
      render(<AddNewMember teamId={123} />);
    });

    fireEvent.change(screen.getByPlaceholderText('Search user...'), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByText('Add to Team'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/addmember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId: 123, userId: '1' }),
      });
    });
  });
});

