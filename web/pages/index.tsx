import Link from 'next/link';
import React, { useState } from 'react';
import { useLoginMutation } from '../components/generated/graphql';
import Layout from '../components/Layout';

interface Props {}

const Login: React.FC<Props> = () => {
  const [form, setFormData] = useState({
    email: "",
    password: ""
  });
  const [login] = useLoginMutation()


  async function onSubmit(e: Event) {
    e.preventDefault();
    const res = await login({
      variables: {
        loginData: {
          email: form.email,
          password: form.password
        }
      }
    })
    console.log(res)
  }

  return (
    <Layout>
      <div className="login">
        <div className="login-card">
          <h1>Login!</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="feild">
              <label htmlFor="email">Email</label>
              <br/>
              <input 
              onChange={(e) => {
                setFormData({
                  email: e.target.value,
                  password: form.password
                })
              }}
              type="email" 
              id="email"
              value={form.email}
              required/>
            </div>

            <div className="feild">
              <label htmlFor="password">Password</label>
              <br/>
              <input 
              onChange={(e) => {
                setFormData({
                  email: form.email,
                  password: e.target.value
                })
              }}
              type="password" 
              id="password"
              value={form.password}
              required/>
            </div>
            <Link href="/signup"><a>Don't have an account?</a></Link>
            <button>Login</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login;