import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../../../../backend/src/user/User';

export default function UserSignIn() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string|null>(null);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>, key: string) {
    setCredentials({ ...credentials, [key]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.get<User>(
        `http://localhost:3001/v1/user/${credentials.username}/password/${credentials.password}`
      );
      setUser(response.data);
      !response.data ? setError("Credentials don't match our records. Please try again.") : setError(null)
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => handleInputChange(e, 'username')}
          placeholder="Enter Username"
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => handleInputChange(e, 'password')}
          placeholder="Enter Password"
        />
        <button type="submit"> Sign in </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {user ? (
          <div>
            <h2> Found User </h2>
            <p> Email: {user.email} </p>
          </div>
        ) : (
          <p> Enter a username and password and submit to sign in </p>
        )}
      </div>
    </div>
  );
}
