import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Home } from './pages/index';
import Product from './1-RQById/Shop/Product';
import Products from './1-RQById/Shop/Products';
import ParallelQueries from './2-ParallelQueries/ParallelQueries';
import DependentQueries from './3-DependentQueries/DependentQueries';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/parallel">Parallel</Link>
            <Link to="/dependent">Dependent</Link>
          </nav>

          <Routes>
            <Route path="/products" element={<Products />}>
              {/* <Route path=":productId" element={<Product />} /> */}
            </Route>
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/parallel" element={<ParallelQueries />} />
            <Route
              path="/dependent"
              element={<DependentQueries email="lukjanov.igr@gmail.com" />}
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
