import { GetWeather, GetCocktail } from '../components/Landing/final';
import Layout from '../Layout/Layout';
import PageCard from '../components/Common/PageCard';

function Landing() {
  return (
    <Layout>
      <PageCard>
        <GetCocktail></GetCocktail>
        <GetWeather></GetWeather>
      </PageCard>
    </Layout>
  );
}

export default Landing;
