import Header from '../../components/Header';

const Wrapper = (props: never) => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  );
};

export default Wrapper;
