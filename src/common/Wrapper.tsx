import Header from "../components/Header";

const Wrapper = (props: unknown) => (
  <div>
    <Header />
    <div>{props.children}</div>
  </div>
);

export default Wrapper;
