import { FC, useEffect } from 'react';
import landingPageBG from '../../assets/images/landing-page-bg.png';
import Features from './features/Features';
import WelcomeAndSubmit from './welcome-and-submit/WelcomeAndSubmit';
import './LandingPage.scss';

const LandingPage: FC = () => {
  return (
    <>
      <img src={landingPageBG} alt="landing-page-bg" />
      <WelcomeAndSubmit />
      <Features />
    </>
  );
};

export default LandingPage;
