import { NavLink } from "react-router";

export default function Nav() {
  return (
    <>
      <nav>
        <ul>
          <NavLink
            to={"/"}
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Home
          </NavLink>
          <NavLink
            to={"/community"}
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Community
          </NavLink>
          <NavLink
            to={"/shop"}
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Shop
          </NavLink>
          <NavLink
            to={"/about"}
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            About
          </NavLink>
        </ul>
      </nav>
    </>
  );
}
