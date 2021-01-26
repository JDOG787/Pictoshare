import React from 'react';
import styles from '../styles/Post.module.css';

interface Props {
    author: string;
    body: string;
    image: string;
}

const Post: React.FC<Props> = (props) => {
    return (
        <div className={styles.post}>
            <div className={styles.author}>
                <div className={styles.authorIcon}>
                    <i className="gg-user"></i>
                </div>
                <span className={styles.authorUsername}>{props.author}</span>
            </div>
            <p className={styles.body}>
                {props.body}
                <div className={styles.readMore}>Read More</div>
            </p>
            <div>
                <img className={styles.postImage} src={props.image}/>
            </div>
        </div>
    )
}

export default Post;