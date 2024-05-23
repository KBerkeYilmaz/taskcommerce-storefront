import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-screen min-h-screen overflow-y-auto overflow-x-hidden text-slate-600 flex flex-col bg-white ">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer>Scandiweb Test Application</Footer>
    </div>
  );
}; 
export default Layout;
