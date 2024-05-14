import React from 'react';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';

interface NavigationButtonProps {
  placeholderText: string;
  icon: IconType;
  route: string;
  showPlaceholder: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  placeholderText,
  icon: Icon,
  route,
  showPlaceholder,
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(route);
  };

  return (
    <button onClick={handleNavigation} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200">
        <Icon size={20}/>
        {showPlaceholder && <span>{placeholderText}</span>}
    </button>
  );
};

export default NavigationButton;
