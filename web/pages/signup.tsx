import Link from 'next/link';
import { useState } from 'react';
import { useSignupMutation } from '../components/generated/graphql';
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Auth.module.css';
import { useRouter } from 'next/router';
import Error from '../components/Error';

interface Props {}

const Signup: React.FC<Props> = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [signup] = useSignupMutation();
  const [error, setError] = useState("");
  const router = useRouter()
  

  async function onSubmit(e: Event) {
    e.preventDefault()
    try {
      const res = await signup({
        variables: {
          userInfo: {
            username: form.username,
            email: form.email,
            password: form.password
          }
        }  
      })
      router.push("/feed");
    } catch(e) {
      setError(e.message)
    }
  }

  return (
    <Layout showNav={false}>
    <div className={styles.signup}>
      <img className={styles.logo} src="/images/pictoshare-logo.png"/>
      <div className={styles.signupCard}>
        <h1 className={styles.header}>Signup!</h1>
        <Error message={error}/>
        <form onSubmit={(e) => onSubmit(e)}>
        <div className={styles.feild}>
            <label className={styles.label} htmlFor="usernmae">Username</label>
            <br/>
            <input 
            className={styles.textbox}
            onChange={(e) => {
              setForm({
                username: e.target.value,
                email: form.email,
                password: form.password
              })
            }}
            type="text" 
            id="username"
            value={form.username}
            required/>
          </div>

          <div className={styles.feild}>
            <label className={styles.label} htmlFor="email">Email</label>
            <br/>
            <input 
            className={styles.textbox}
            onChange={(e) => {
              setForm({
                username: form.username,
                email: e.target.value,
                password: form.password
              })
            }}
            type="email" 
            id="email"
            value={form.email}
            required/>
          </div>

          <div className={styles.feild}>
            <label className={styles.label} htmlFor="password">Password</label>
            <br/>
            <input 
            className={styles.textbox}
            onChange={(e) => {
              setForm({
                username: form.username,
                email: form.email,
                password: e.target.value
              })
            }}
            type="password" 
            id="password"
            value={form.password}
            required/>
          </div>
          <div className={styles.switchPage}>
            <p>Already have an account?</p>
            <Link href="/"><a>Login</a></Link>
          </div>
          <br/>
          <div className={styles.btnContainer}>
            <button className={styles.btn}>Login</button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
  )
}

export default Signup;