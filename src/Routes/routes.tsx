import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/Pages/Home';
import NotFound from '@/Pages/NotFound';
import Books from '@/Pages/Books';
import BookDetail from '@/Pages/BookDetail';
import Login from '@/Pages/Login';
import Signup from '@/Pages/Signup';
import PrivateRoute from './PrivateRoute';
import AddOrEditBook from '@/Pages/AddOrEditBook';

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
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book-details/:id',
        element: <BookDetail />,
      },
      {
        path: '/add-book',
        element: (
          <PrivateRoute>
            <AddOrEditBook />
          </PrivateRoute>
        ),
      },
      {
        path: '/edit-book/:id',
        element: (
          <PrivateRoute>
            <AddOrEditBook />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
