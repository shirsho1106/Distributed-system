import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import Header from './components/Header'
import PrivateRoute from './utils/PrivateRoute'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Stories from './pages/Stories';

function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
      <Header/>
        <Routes>
          <Route exact path="/" element={<PrivateRoute child={<HomePage/>} />} />
          <Route path="/login" element={<PrivateRoute child={<LoginPage/>} />}/>
          <Route path="/register" element={<PrivateRoute child={<RegisterPage/>} />}/>
          <Route path="/media" element={<PrivateRoute child={<Stories/>} />}/>
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
