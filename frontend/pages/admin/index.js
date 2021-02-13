import Layout from '../../components/Layout';
import Link from 'next/link';
import Admin from '../../components/auth/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <h2>Admin Dashboard</h2>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;