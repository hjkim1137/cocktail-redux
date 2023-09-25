import GetWeather from '../components/Landing/getWeather/GetWeather';
import Layout from '../Layout/Layout';
import PageCard from '../components/Common/PageCard';

function Landing() {
  return (
    <Layout>
      <PageCard>
        <GetWeather></GetWeather>
      </PageCard>
    </Layout>
  );
}

export default Landing;
