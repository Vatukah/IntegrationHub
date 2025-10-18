import { NavLink } from "react-router";

export default function NavButton({ icon, text ,path}) {
  return (
    <NavLink to={path}
      className="flex items-center gap-2 p-2 w-full rounded-md 
                 hover:text-cyan-400 hover:bg-cyan-400/10 
                 transition-all duration-200 
                 whitespace-nowrap select-none navButton"
    >
      <span className="">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </NavLink>
  );
}