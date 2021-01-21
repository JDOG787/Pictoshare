import React from 'react';
import styles from '../styles/Footer.module.css';
import Link from 'next/link';

interface Props {}

const Footer: React.FC<Props> = () => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.links}>
                <Link href="/"><a className={styles.link}>Link</a></Link> |
                <Link href="/"><a className={styles.link}>Link</a></Link> |
                <Link href="/"><a className={styles.link}>Link</a></Link> | 
                <Link href="/"><a className={styles.link}>Link</a></Link> |
                <Link href="/"><a className={styles.link}>Link</a></Link>
                
            </div>
            <p className={styles.copyRight}>© 2021 Pictoshare</p>
        </footer>
    )
}

export default Footer;