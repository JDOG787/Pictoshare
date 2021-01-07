import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Login!</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input 
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        type="email" 
        placeholder="Email" 
        value={email}
        required/>
        <input 
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        type="password" 
        placeholder="Password" 
        value={password}
        required/>
        <Link href="/signup"><a>Don't have an account?</a></Link>
        <button>Login</button>
      </form>
    </div>
  )
}