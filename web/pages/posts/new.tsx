import React, { useState } from 'react';
import styles from '../../styles/NewPost.module.css';
import Layout from '../../components/Layout';

const NewPost: React.FC = () => {
    const [body, setBody] = useState("");

    function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(body)
    }

    return (
        <Layout showNav={true} pageTitle="Make a post!">
            <div className={styles.newPost}>
                <h1 className={styles.header}>Tell people what you're up to!</h1>
                <form className={styles.form} onSubmit={(e) => handelSubmit(e)}>
                    <div className={styles.field}>
                        <label htmlFor="body" className={styles.label}>Content</label>
                        <textarea 
                        id="body" 
                        className={styles.postBody}
                        onChange={(e) => {
                            setBody(e.target.value)
                        }}
                        />
                    </div>
                    <button className={styles.btn}>Post</button>
                </form>
            </div>
        </Layout>
    )
}

export default NewPost;