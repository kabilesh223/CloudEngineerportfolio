import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getUsers();
      if (data.error) {
        throw new Error(data.error);
      }
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (error) {
    return <div className="message error">{error}</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>All Users ({users.length})</h2>
      {users.length === 0 ? (
        <p style={{ color: '#999' }}>No users found</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.full_name || 'No name'}</h3>
              <p>{user.email}</p>
              <small>Joined {new Date(user.created_at).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
