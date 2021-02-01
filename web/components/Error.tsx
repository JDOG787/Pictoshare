import React from 'react';
import styles from '../styles/Error.module.css';

interface Props {
    message: string
}

const Error: React.FC<Props> = (props) => {
    return (
        <div className={styles.container}>
            {
                props.message 
                ?
                <div className={styles.error}>{props.message}</div>
                :
                ""
            }
        </div>
    )
}

export default Error;