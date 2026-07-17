import React, { useState, useEffect } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }
        const data = await response.json();
        setProducts(data.slice(0, 10));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (loading) {
      document.title = 'Loading Dashboard...';
    } else if (error) {
      document.title = 'Error Loading Dashboard';
    } else {
      document.title = `Dashboard (${products.length} Products)`;
    }
  }, [loading, error, products]);

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Real-time Dashboard</h2>
          <div style={styles.timerBadge}>
            Time Spent: {seconds}s
          </div>
        </div>

        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>Fetching products, please wait...</p>
          </div>
        )}

        {error && (
          <div style={styles.errorContainer}>
            <p>⚠️ Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div style={styles.productList}>
            {products.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <img src={product.image} alt={product.title} style={styles.productImage} />
                <div style={styles.productDetails}>
                  <h4 style={styles.productTitle}>{product.title}</h4>
                  <p style={styles.productCategory}>{product.category}</p>
                  <p style={styles.productPrice}>${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  bodyWrapper: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#121214',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    boxSizing: 'border-box',
    color: '#e1e1e6',
  },
  container: {
    backgroundColor: '#1e1e24',
    padding: '25px',
    borderRadius: '8px',
    border: '1px solid #29292e',
    width: '100%',
    maxWidth: '650px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #29292e',
    paddingBottom: '15px',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
    color: '#00ffcc',
    fontSize: '24px',
  },
  timerBadge: {
    backgroundColor: 'rgba(0, 255, 204, 0.15)',
    color: '#00ffcc',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    border: '1px solid #00ffcc',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '40px 0',
    color: '#a8a8b2',
  },
  spinner: {
    border: '4px solid rgba(255, 255, 255, 0.1)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    borderLeftColor: '#00ffcc',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 15px auto',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 74, 74, 0.1)',
    border: '1px solid #ff4a4a',
    borderRadius: '6px',
    color: '#ff4a4a',
    padding: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  productCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: '#29292e',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #323238',
  },
  productImage: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    borderRadius: '4px',
    backgroundColor: '#fff',
    padding: '5px',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    margin: '0 0 5px 0',
    fontSize: '16px',
    color: '#ffffff',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  productCategory: {
    margin: '0 0 5px 0',
    fontSize: '13px',
    color: '#a8a8b2',
    textTransform: 'uppercase',
  },
  productPrice: {
    margin: 0,
    fontSize: '15px',
    color: '#00ffcc',
    fontWeight: 'bold',
  },
};