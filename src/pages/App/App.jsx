import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import NewBattlestationPage from '../NewBattlestationPage/NewBattlestationPage';
import BattlestationDetailPage from '../BattlestationDetailPage/BattlestationDetailPage'
import BattlestationPendingListPage from '../BattlestationPendingListPage/BattlestationPendingListPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    
    <main className='main'>
      <NavBar user={user} setUser={setUser} />
        <>
          <Routes>
            <Route path="/" element={<HomePage /> } />
            <Route path="/battlestations/new" element={user ? <NewBattlestationPage /> : <Navigate to="/auth/login" />} />
            <Route path="/battlestations/:id" element={<BattlestationDetailPage user={user} setUser={setUser}/>} />
            <Route path="/pending" element={user ? <BattlestationPendingListPage /> : <Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={!user ? <AuthPage setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
    </main>
  );
}