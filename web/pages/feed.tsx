import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Feed.module.css';
import Post from '../components/Post';

const Feed: React.FC = () => {
    return (
        <Layout showNav={true} pageTitle="Feed">
            <div className={styles.feed}>
                <h1 className={styles.header}>See what's popping!</h1>
                <div className={styles.posts}>
                    <Post author="JDOG" body="blah blah blah!" image="/images/pictoshare-logo-dark.png"/>
                </div>
            </div>
        </Layout>
    )
}

export default Feed;