import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <div className="header">
      <Link className="link" to={"/"}>
        <h1 className="brand">blogpost</h1>
      </Link>
    </div>
  );
}
export default Header;
