import Layout from '../components/Layout';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';


const Index = () => {
    return (
        <Layout>
            <h2>Index page</h2>
            {/* we use Link as it helps to not reload the page while changing the page/component */}
            <Link  href="/signup">
                <a>Signup</a>
            </Link>
        </Layout>
    );
};

export default Index;