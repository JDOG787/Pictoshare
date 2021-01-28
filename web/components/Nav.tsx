import React from 'react';
import styles from "../styles/Nav.module.css";
import Link from 'next/link';

const Nav: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.items}>
                <div className={styles.left}>
                    <img className={styles.logoIcon} src="/images/icon-logo.png"/>
                    <Link href="/feed">
                        <a className={styles.navLink}>Feed</a>
                    </Link>
                    <div className={styles.searchBar}>  
                        <input placeholder="Find a friend?"/>

                        <button>
                            <i className="gg-search"></i>
                        </button>
                    </div>
                </div>
                <div>
                    
                </div>
                <div className={styles.right}>
                    <div className={styles.postBtn}>
                        <Link href="/posts/new">
                            <a className={styles.postLink}>Post</a>
                        </Link>
                    </div>
                    <div className={styles.notifications}>
                        <Link href="#">
                            <a className={styles.notiLink}>
                                <i className="gg-bell"></i>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.userIcon}>
                        <i className="gg-user"></i>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;