import GetWeather from '../components/Home/getWeather/GetWeather';
import Layout from '../Layout/Layout';
import PageCard from '../components/Common/PageCard';

function Home() {
  return (
    <Layout>
      <PageCard>
        <GetWeather></GetWeather>
      </PageCard>
    </Layout>
  );
}

export default Home;
