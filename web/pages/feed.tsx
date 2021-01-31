import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Feed.module.css';
import Post from '../components/Post';
import { useFeedQuery } from '../components/generated/graphql';

const Feed: React.FC = () => {
    const {data, loading} = useFeedQuery()
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Layout showNav={true} pageTitle="Feed">
            <div className={styles.feed}>
                <h1 className={styles.header}>See what's popping!</h1>
                <div className={styles.posts}>
                    {
                        data ?
                        data.feed.map(post => {
                            return  <Post author={post.author.username} body={post.body} image="/images/pictoshare-logo-dark.png"/>
                        })
                        :
                        ""
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Feed;