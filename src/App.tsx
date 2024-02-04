import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import Router from './Router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
