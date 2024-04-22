import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../../../../backend/src/user/User';

export default function UserDetails() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | null>(null);

  function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    try {
      const response = await axios.get<User>(`http://localhost:3001/v1/user/${username}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter username"
        >
        </input>
       <button type="submit">Submit</button>
      </form>
      
      <div>
        {user ? (
          <div>
            <h2>User Details</h2>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Password: {user.password}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Enter a username and submit to fetch user data.</p>
        )}
      </div>

    </div>
  );
};