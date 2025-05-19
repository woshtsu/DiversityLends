import { NavBar } from "./NavBar";

export function Header() {
  return (
    <header>
      <NavBar logo="../../public/logo.webp" isButton={true} isSearchBar={true} />
    </header>
  )
}