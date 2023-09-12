import React from 'react';
import CocktailMatch from '../components/Landing/CocktailMatch';
// import CHLayout from "../components/Landing/CHLayout";
import Layout from '../Layout/Layout';
import PageCard from '../components/Common/PageCard';

function Landing() {
  return (
    <Layout>
      <PageCard>
        <CocktailMatch></CocktailMatch>
      </PageCard>
    </Layout>
  );
}

export default Landing;
