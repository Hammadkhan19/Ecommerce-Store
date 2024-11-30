import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import Cart from "./Cart/Cart";
import ProfileMenu from "./HomeComponets/Profile";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { cartItems } = useContext(CartContext);

  // Toggle function to show/hide the cart
  const toggleCart = () => {
    setShowModal(!showModal);
  };

  const mainLinks = [
    { name: "Home", key: "home", path: "/" },
    { name: "Brands", key: "brands", path: "/brands" },
    { name: "Shop", key: "shop", path: "/products" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <RouterLink to="/" className="font-bold text-inherit text-4xl">
          Lati
        </RouterLink>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex  font-bold mr-8 gap-4"
        justify="center"
      >
        {mainLinks.map((link) => (
          <NavbarItem key={link.key}>
            <RouterLink to={link.path} className="text-black">
              {link.name}
            </RouterLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <Input
        classNames={{
          base: "max-w-full sm:max-w-[10rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<FaSearch size={18} />}
        type="search"
      />
      <NavbarContent className="">
        <div className="relative">
          {/* Cart Icon */}
          <button className="relative p-2" onClick={toggleCart}>
            <FaShoppingCart size={24} className="text-black" />
            {/* Product Count */}
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Cart Modal */}
        <Cart showModal={showModal} toggle={toggleCart} />
        <NavbarItem>
          <ProfileMenu />
        </NavbarItem>
      </NavbarContent>

      {/* Hamburger Menu (NavbarMenu) */}
      <NavbarMenu>
        {/* Main Links in Hamburger Menu */}
        {mainLinks.map((link) => (
          <NavbarMenuItem key={link.key}>
            <RouterLink to={link.path} className="text-black">
              {link.name}
            </RouterLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
