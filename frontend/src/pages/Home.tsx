// src/pages/Home.tsx
import React from 'react';
import UserDetails from '../components/user/UserDetails';
import UserSignIn from '../components/user/UserSignIn';

export default function Home() {
  return (
    <div>
      <h1>Get your own Paint By Number</h1>
      <UserDetails />
      <UserSignIn />
    </div>
  );
};

