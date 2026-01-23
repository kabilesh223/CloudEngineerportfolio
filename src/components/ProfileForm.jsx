import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function ProfileForm({ onLogout, onAccountDeleted }) {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await api.getProfile(token);
      if (data.error) {
        throw new Error(data.error);
      }
      setProfile(data);
      setFullName(data.full_name || '');
    } catch (err) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await api.updateProfile(token, fullName);
      if (data.error) {
        throw new Error(data.error);
      }
      setProfile(data.user);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    setError('');
    try {
      const data = await api.deleteProfile(token);
      if (data.error) {
        throw new Error(data.error);
      }
      onAccountDeleted();
    } catch (err) {
      setError(err.message || 'Failed to delete account');
      setDeleting(false);
    }
  };

  if (!profile && !loading) {
    return <div className="message error">Profile not found</div>;
  }

  return (
    <div>
      <div className="profile-section">
        <h2>My Profile</h2>
        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}

        {profile && (
          <>
            <div className="profile-info">
              <p><strong>User ID:</strong> {profile.id}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </>
        )}
      </div>

      <div className="profile-section">
        <h2>Actions</h2>
        <button className="btn btn-secondary" onClick={onLogout} style={{ marginBottom: '10px' }}>
          Logout
        </button>
        <button className="btn btn-danger" onClick={handleDeleteAccount} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
}
