import React, { useEffect } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {
    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
                <title>Pictoshare</title>
            </Head> 
            {props.children}
            <Footer/>
        </div>
    )
}

export default Layout;