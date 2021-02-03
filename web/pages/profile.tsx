import React from 'react';
import Layout from '../components/Layout';
import Me from '../components/Me';

const Profile: React.FC = () => {
    return (
        <Layout showNav={true}>
            <Me/>
        </Layout>
    )
}

export default Profile;