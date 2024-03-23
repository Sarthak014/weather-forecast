import HeaderItems from "./HeaderItems";
import Logo from "./Logo";

function Header() {
  return (
    <div className="flex flex-row justify-between py-5 px-16 bg-gray-800">
      <Logo />
      <HeaderItems />
    </div>
  );
}

export default Header;
