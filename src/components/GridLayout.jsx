import Banner from "./Banner";

const GridLayout = ({ children, title }) => {
  return (
    <Banner>
      <h1 className="text-3xl mb-8">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </Banner>
  );
};

export default GridLayout;
