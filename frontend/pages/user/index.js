import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <h2>User Dashboard</h2>
            </Private>
        </Layout>
    );
};

export default UserIndex;