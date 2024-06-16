import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddNewMember from './AddNewMember';

// Mock the fetch calls
global.fetch = jest.fn();

describe('AddNewMember', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', async () => {
    render(<AddNewMember teamId={1} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('fetches and displays users', async () => {
    const mockUsers = [
      {
        id_user: '1',
        name: 'John Doe',
        job_title: 'Developer',
        team_name: 'Team A',
        overall_average: 90,
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ rows: mockUsers }),
    });

    render(<AddNewMember teamId={1} />);

    userEvent.click(screen.getByRole('combobox'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('handles fetch failure gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<AddNewMember teamId={1} />);

    userEvent.click(screen.getByRole('combobox'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Error fetching users. Please try again.')).toBeInTheDocument();
  });

  test('adds user to team on button click', async () => {
    const mockUsers = [
      {
        id_user: '1',
        name: 'John Doe',
        job_title: 'Developer',
        team_name: 'Team A',
        overall_average: 90,
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ rows: mockUsers }),
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<AddNewMember teamId={1} />);

    userEvent.click(screen.getByRole('combobox'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    userEvent.click(screen.getByText('John Doe'));

    userEvent.click(screen.getByText('Add to Team'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

  });
});





