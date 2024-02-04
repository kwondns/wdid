import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import Router from './Router';

import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

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
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        stacked
      />
    </RecoilRoot>
  );
}

export default App;
