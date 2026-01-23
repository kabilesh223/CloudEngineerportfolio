import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';

function AppContent() {
  const { isAuthenticated, loading, logout } = useAuth();
  const [view, setView] = useState('login');

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>UniLocker</h1>
          <p>Universal Authentication</p>
        </div>
        <div className="content">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Dashboard
        onLogout={async () => {
          await logout();
          setView('login');
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>UniLocker</h1>
        <p>Universal Authentication</p>
      </div>

      <div className="content">
        {view === 'login' ? (
          <LoginForm
            onSuccess={() => setView('dashboard')}
            onSwitchToRegister={() => setView('register')}
          />
        ) : (
          <RegisterForm
            onSuccess={() => setView('login')}
            onSwitchToLogin={() => setView('login')}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
