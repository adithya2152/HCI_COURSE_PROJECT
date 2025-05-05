import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import { UserProvider } from './context/UserContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Learning from './pages/Learning/Learning';
import Career from './pages/Career/Career';
import Chat from './pages/Chat/Chat';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Accessibility from './pages/Accessibility/Accessibility';
import { useUser } from './context/UserContext';

// Protected Route component implementing access control
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <UserProvider>
        <ChatProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/learning"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Learning />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/career"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Career />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Chat />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/accessibility"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Accessibility />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ChatProvider>
      </UserProvider>
    </Router>
  );
}

export default App;