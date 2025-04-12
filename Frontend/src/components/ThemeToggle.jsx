import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Redux/ThemeSlice';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle Dark Mode"
      className="transition-colors duration-300 text-gray-600 dark:text-yellow-400 hover:text-blue-500 dark:hover:text-white"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
