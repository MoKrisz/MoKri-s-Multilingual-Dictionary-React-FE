import { Link } from "react-router-dom";
import { menuItems } from "../config/nav";
import { MenuItem } from "./MenuItem";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [exitingMenuItem, setExitingMenuItem] = useState<string | null>(null);

  const currentSubmenu = menuItems.find((mi) => mi.label === activeMenuItem);

  const hasSubmenuItems =
    activeMenuItem !== null &&
    currentSubmenu?.subItems &&
    currentSubmenu.subItems.length > 0;

  const handleMouseEnter = (label: string) => {
    setExitingMenuItem(null);
    setActiveMenuItem(label);
  };

  const handleMouseLeave = () => {
    setExitingMenuItem(activeMenuItem);
    setActiveMenuItem(null);
  };

  return (
    <>
      <div
        key="backdrop"
        className={`transition-opacity duration-200 z-40 ${
          activeMenuItem && hasSubmenuItems
            ? "opacity-100 fixed left-0 right-0 bottom-0 top-0 backdrop-blur-sm"
            : "opacity-0"
        }`}
      />
      <header
        className="flex-col relative z-50"
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-2 flex bg-lincolngreendarker shadow-md">
          <Link
            to="/"
            className="text-sm font-bold leading-tight whitespace-nowrap"
          >
            MoKri's <br /> Multilingual Dictionary
          </Link>
          <nav className="flex items-end justify-evenly w-full">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                item={item}
                onHoverStart={() => handleMouseEnter(item.label)}
              />
            ))}
          </nav>
        </div>

        <AnimatePresence>
          {(activeMenuItem || exitingMenuItem) && (
            <motion.div
              layout
              key="submenu"
              initial={{ height: 0 }}
              animate={{
                height: currentSubmenu?.height,
              }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 bg-lincolngreendarker overflow-hidden shadow-lg"
            >
              <AnimatePresence
                mode="wait"
                onExitComplete={() => setExitingMenuItem(null)}
              >
                {activeMenuItem && hasSubmenuItems && (
                  <motion.div
                    key={activeMenuItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="mx-auto max-w-screen-sm grid grid-cols-4 gap-4 pt-3"
                  >
                    {currentSubmenu.subItems?.map((sub) => (
                      <div className="flex justify-center" key={sub.label}>
                        <Link
                          to={sub.path}
                          className="text-sm text-gray-800 hover:text-black hover:font-semibold px-4 transition-colors duration-200"
                          onClick={handleMouseLeave}
                        >
                          {sub.label}
                        </Link>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
