import Link from 'next/link';
import React, { useState } from 'react';
import { useLoginMutation } from '../components/generated/graphql';
import Layout from '../components/Layout';
import styles from '../styles/Auth.module.css';
import {useRouter} from 'next/router';

interface Props {}

const Login: React.FC<Props> = () => {
  const [form, setFormData] = useState({
    email: "",
    password: ""
  });
  const [login] = useLoginMutation();
  const router = useRouter();


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
    router.push("/users");
  }

  return (
    <Layout showNav={false}>
      <div className={styles.login}>
        <img className={styles.logo} src="/images/pictoshare-logo.png"/>
        <div className={styles.loginCard}>
          <h1 className={styles.header}>Login!</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className={styles.feild}>
              <label className={styles.label} htmlFor="email">Email</label>
              <br/>
              <input 
              className={styles.textbox}
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

            <div className={styles.feild}>
              <label className={styles.label} htmlFor="password">Password</label>
              <br/>
              <input 
              className={styles.textbox}
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
            <div className={styles.switchPage}>
              <p>Don't have an account?</p>
              <Link href="/signup"><a>Create one</a></Link>
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

export default Login;