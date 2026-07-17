import React, { createContext, useContext, useReducer } from 'react';

const FavoritesContext = createContext();

const initialState = {
  favorites: []
};

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.some(movie => movie.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== action.payload)
      };
    default:
      return state;
  }
}

function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  return (
    <FavoritesContext.Provider value={{ favorites: state.favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  return useContext(FavoritesContext);
}

const MOVIES_DATA = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010 },
  { id: 2, title: 'The Dark Knight', genre: 'Action', year: 2008 },
  { id: 3, title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
  { id: 4, title: 'Pulp Fiction', genre: 'Crime', year: 1994 }
];

function MovieList() {
  const { favorites, dispatch } = useFavorites();

  const handleToggleFavorite = (movie) => {
    const isFav = favorites.some(fav => fav.id === movie.id);
    if (isFav) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: movie.id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: movie });
    }
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>Available Movies</h3>
      <div style={styles.grid}>
        {MOVIES_DATA.map((movie) => {
          const isFav = favorites.some(fav => fav.id === movie.id);
          return (
            <div key={movie.id} style={styles.card}>
              <h4 style={{ margin: '0 0 5px 0', color: '#ffffff' }}>{movie.title}</h4>
              <p style={{ margin: '0 0 15px 0', color: '#a8a8b2', fontSize: '14px' }}>
                {movie.genre} • {movie.year}
              </p>
              <button
                onClick={() => handleToggleFavorite(movie)}
                style={{
                  ...styles.button,
                  backgroundColor: isFav ? '#ff4a4a' : '#00ffcc',
                  color: isFav ? '#ffffff' : '#121214'
                }}
              >
                {isFav ? '❤️ Remove' : '🤍 Add to Favorites'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FavoritesList() {
  const { favorites, dispatch } = useFavorites();

  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>My Favorites ({favorites.length})</h3>
      {favorites.length === 0 ? (
        <p style={styles.emptyText}>No favorite movies added yet.</p>
      ) : (
        <div style={styles.list}>
          {favorites.map((movie) => (
            <div key={movie.id} style={styles.favItem}>
              <div>
                <span style={{ fontWeight: 'bold', color: '#ffffff' }}>{movie.title}</span>
                <span style={{ color: '#a8a8b2', fontSize: '13px', marginLeft: '10px' }}>({movie.genre})</span>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_FAVORITE', payload: movie.id })}
                style={styles.deleteBtn}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.container}>
        <h2 style={styles.mainTitle}>🎬 Global Favorites System</h2>
        
        <FavoritesList />
        <MovieList />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <Dashboard />
    </FavoritesProvider>
  );
}

const styles = {
  bodyWrapper: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#121214',
    minHeight: '100vh',
    color: '#e1e1e6',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxSizing: 'border-box'
  },
  container: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#1e1e24',
    padding: '30px',
    borderRadius: '8px',
    border: '1px solid #29292e',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
  },
  mainTitle: {
    textAlign: 'center',
    color: '#00ffcc',
    marginTop: 0,
    marginBottom: '30px'
  },
  section: {
    marginBottom: '35px'
  },
  sectionTitle: {
    color: '#00ffcc',
    borderBottom: '1px solid #29292e',
    paddingBottom: '10px',
    marginBottom: '20px'
  },
  emptyText: {
    color: '#7c7c8a',
    fontStyle: 'italic'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  favItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#29292e',
    padding: '12px 15px',
    borderRadius: '6px',
    borderLeft: '4px solid #00ffcc'
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    color: '#ff4a4a',
    border: '1px solid #ff4a4a',
    padding: '4px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    transition: 'all 0.2s'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  card: {
    backgroundColor: '#29292e',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #323238',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s'
  }
};