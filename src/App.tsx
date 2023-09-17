import { useEffect } from 'react';
import './App.css';
import MainLayout from './Layout/MainLayout';
import { Toaster } from 'react-hot-toast';
import { useAppDispatch } from './Redux/hooks';
import { setLoading, setUser } from './Redux/features/user/userSlice';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
