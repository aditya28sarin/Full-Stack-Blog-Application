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
            <div className="div">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, dolorum obcaecati harum itaque libero nam ab ipsam nihil odio consequuntur voluptatum alias. Molestiae, fuga. Tenetur, aperiam. Aliquid accusantium molestias distinctio!2000</div>
        </Layout>
    );
};

export default Index;