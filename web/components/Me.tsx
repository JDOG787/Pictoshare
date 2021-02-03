import React from 'react';
import { useCurrentUserQuery } from './generated/graphql';
import styles from '../styles/Profile.module.css';

const Me: React.FC = () => {
    const { data, error, loading } = useCurrentUserQuery();
    console.log(data)

    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    if (error) {
        return (
            <div>
                error
            </div>
        )
    }

    return (
        <div className={styles.profile}>
            <h1 className={styles.username}>{data.currentUser.username}</h1>
        </div>
    )
}

export default Me;