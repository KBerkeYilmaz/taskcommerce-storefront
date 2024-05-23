const GridLayout = ({ children, title }) => {
  return (
    <div className="w-full h-full mx-auto px-8 lg:px-32">
      <h1 className="text-3xl my-8">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
};

export default GridLayout;
