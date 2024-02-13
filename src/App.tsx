import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

import Router from './Router';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);
  return (
    <RecoilRoot>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
        stacked
      />
    </RecoilRoot>
  );
}

export default App;
