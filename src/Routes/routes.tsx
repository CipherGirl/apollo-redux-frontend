import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/Pages/Home';
import NotFound from '@/Pages/NotFound';
import Books from '@/Pages/Books';
import BookDetail from '@/Pages/BookDetail';
import Login from '@/Pages/Login';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book-details/:id',
        element: <BookDetail />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
