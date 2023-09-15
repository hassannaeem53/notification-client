import { ReactNode } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Wrapper;
