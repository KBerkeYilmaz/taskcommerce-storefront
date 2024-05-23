import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Navbar() {
  return (
    <nav className="px-32 py-8 grid grid-cols-3 h-fit w-full">
      <div className="gap-4 flex">
        <Link to="/">Home</Link>
        <Link to="/?=tech">Tech</Link>
        <Link to="/?=smthingelse">Something Else</Link>
      </div>
      <div className="flex justify-center items-center">Main Logo</div>
      <div className="flex justify-end items-center">
        <ShoppingCart size="24" />
      </div>
    </nav>
  );
}

export default Navbar;
