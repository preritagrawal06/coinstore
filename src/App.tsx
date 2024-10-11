import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import CheckoutPage from './pages/CheckoutPage';
import SignIn from './pages/SignIn';
import PaymentStatus from './pages/PaymentStatus'
import SignUp from './pages/SignUp';
import AllTopUpPage from './pages/AllTopUp';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} >
            <Route index element={<LandingPage />} />
            <Route path='/checkout/:code' element={<CheckoutPage/>}/>
            <Route path='/status' element={<PaymentStatus/>}/>
            <Route path='/alltopup' element={<AllTopUpPage/>}/>
          </Route>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
