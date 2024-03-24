import HeaderItems from "./HeaderItems";
import Logo from "./Logo";

function Header() {
  return (
    <div
      className="
        flex
        md:flex-row flex-col
        justify-between
        md:py-5 py-2
        md:px-12 lg:px-16 px-2
        bg-gray-800"
    >
      <Logo />
      <HeaderItems />
    </div>
  );
}

export default Header;
