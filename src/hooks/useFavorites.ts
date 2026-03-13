import { useState, useEffect, useCallback } from 'react';

export type FavoriteType = 'recipe' | 'activity';

export interface Favorite {
  id: string;
  type: FavoriteType;
  title: string;
  image: string;
  addedAt: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tuki-favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load favorites:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('tuki-favorites', JSON.stringify(favorites));
      } catch (e) {
        console.error('Failed to save favorites:', e);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((item: Omit<Favorite, 'addedAt'>) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === item.id && f.type === item.type)) {
        return prev;
      }
      return [...prev, { ...item, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeFavorite = useCallback((id: string, type: FavoriteType) => {
    setFavorites((prev) => prev.filter((f) => !(f.id === id && f.type === type)));
  }, []);

  const toggleFavorite = useCallback((item: Omit<Favorite, 'addedAt'>) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id && f.type === item.type);
      if (exists) {
        return prev.filter((f) => !(f.id === item.id && f.type === item.type));
      }
      return [...prev, { ...item, addedAt: new Date().toISOString() }];
    });
  }, []);

  const isFavorite = useCallback(
    (id: string, type: FavoriteType) => {
      return favorites.some((f) => f.id === id && f.type === type);
    },
    [favorites]
  );

  const getFavoritesByType = useCallback(
    (type: FavoriteType) => {
      return favorites.filter((f) => f.type === type);
    },
    [favorites]
  );

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoritesByType,
  };
}
