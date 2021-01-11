import Link from 'next/link';
import { useState } from 'react';
import { useSignupMutation } from '../components/generated/graphql';
import React from 'react';
import Layout from '../components/Layout';

interface Props {}

const Signup: React.FC<Props> = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [signup] = useSignupMutation()
  

  async function onSubmit(e: Event) {
    e.preventDefault()
    const res = await signup({
      variables: {
        userInfo: {
          username: form.username,
          email: form.email,
          password: form.password
        }
      }
    })
    console.log(res)
  }

  return (
      <Layout>
        <div>
        <h1>Signup!</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <input 
          onChange={(e) => {
            setForm({
              username: e.target.value,
              email: form.email,
              password: form.password
            })
          }}
          type="text" 
          value={form.username}
          placeholder="Username" 
          required
          />

          <input 
          onChange={(e) => {
            setForm({
              username: form.username,
              email: e.target.value,
              password: form.password
            })
          }}
          type="email" 
          placeholder="Email" 
          value={form.email}
          required
          />

          <input 
          onChange={(e) => {
            setForm({
              username: form.username,
              email: form.email,
              password: e.target.value
            })
          }}
          type="password" 
          placeholder="Password" 
          value={form.password}
          required
          />

          <Link href="/"><a>Already have an account?</a></Link>
          <button>Signup</button>
        </form>
      </div>
    </Layout>
  )
}

export default Signup;