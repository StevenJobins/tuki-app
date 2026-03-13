import { useFavorites } from '../hooks/useFavorites';
import type { FavoriteType } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  id: string;
  type: FavoriteType;
  title: string;
  image: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FavoriteButton({
  id,
  type,
  title,
  image,
  size = 'md',
  className = '',
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  
  if (!isLoaded) {
    return (
      <div
        className={`rounded-full bg-gray-100 animate-pulse ${
          size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
        } ${className}`}
      />
    );
  }

  const favorited = isFavorite(id, type);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({ id, type, title, image });
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        rounded-full flex items-center justify-center
        transition-all duration-200
        ${
          favorited
            ? 'bg-tuki-rot text-white hover:bg-red-600'
            : 'bg-white/90 text-tuki-blau hover:bg-tuki-rot hover:text-white'
        }
        shadow-md hover:shadow-lg
        ${className}
      `}
      aria-label={favorited ? 'Von Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
    >
      <svg
        className={iconSizes[size]}
        fill={favorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={favorited ? 0 : 2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
