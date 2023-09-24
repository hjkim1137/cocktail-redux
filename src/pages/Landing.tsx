import { GetWeather, GetCocktail, MakeBtns } from '../components/Landing/final';
import Layout from '../Layout/Layout';
import PageCard from '../components/Common/PageCard';

function Landing() {
  return (
    <Layout>
      <PageCard>
        <GetWeather></GetWeather>
        <GetCocktail></GetCocktail>
        <MakeBtns></MakeBtns>
      </PageCard>
    </Layout>
  );
}

export default Landing;
