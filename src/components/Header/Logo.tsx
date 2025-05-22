import routePath from "@/router/routePath";
import { logoImg, gastronautLogoImg } from "@/utils/constants/assets";
import { Link } from "react-router";
const Logo = () => {
  return (
    <Link to={routePath.dashboard} className="">
      {/* <img className="w-14 mt-1 md:w-40" src={gastronautLogoImg} /> */}
      {/* <img className="w-14 mt-1 md:w-20" src={logoImg} /> */}
      <h1 className="text-3xl font-bold text-primary">TableManager</h1>
    </Link>
  );
};

export default Logo;
