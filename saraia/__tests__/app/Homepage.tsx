import {render} from '@testing-library/react';
import {screen} from '@testing-library/react';
import Home from '@/app/page'
it('renders home page', () => {
    render(<Home/>)
    expect(screen.getByText('Get started by editing app/page.tsx')).toBeInTheDocument
});