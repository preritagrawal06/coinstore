import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import CheckoutPage from './pages/CheckoutPage';
import SignIn from './pages/SignIn';
import PaymentStatus from './pages/PaymentStatus'
import SignUp from './pages/SignUp';
import AllTopUpPage from './pages/AllTopUp';
import PrivacyPolicy from './pages/PrivacyPolicy';

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
            <Route path='/policy' element={<PrivacyPolicy/>}/>
          </Route>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
