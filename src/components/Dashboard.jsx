import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ProfileForm } from './ProfileForm';
import { UsersList } from './UsersList';

export function Dashboard({ onLogout }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = async () => {
    await onLogout();
  };

  const handleAccountDeleted = () => {
    onLogout();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome, {user?.email}!</h1>
        <p>Manage your account and view other users</p>
      </div>

      <div className="content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </button>
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            All Users
          </button>
        </div>

        {activeTab === 'profile' && (
          <ProfileForm onLogout={handleLogout} onAccountDeleted={handleAccountDeleted} />
        )}
        {activeTab === 'users' && <UsersList />}
      </div>
    </div>
  );
}
