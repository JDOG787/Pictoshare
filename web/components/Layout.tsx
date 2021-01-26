import React, { useEffect } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import Nav from './Nav';

interface Props {
    children: React.ReactNode,
    showNav: boolean,
    pageTitle?: String
}

const Layout: React.FC<Props> = (props) => {
    return (
        <div>
            { props.showNav ? <Nav/> : "" }
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet"/>
                <link href='https://css.gg/css' rel='stylesheet'/>
                { props.pageTitle ? <title>Pictoshare - {props.pageTitle}</title> : <title>Pictoshare</title> }
            </Head> 
            {props.children}
            <Footer/>
        </div>
    )
}

export default Layout;