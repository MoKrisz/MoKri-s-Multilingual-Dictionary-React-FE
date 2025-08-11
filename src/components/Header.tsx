import { Link } from "react-router-dom";
import { menuItems } from "../config/nav";
import { MenuItem } from "./MenuItem";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [exitingMenuItem, setExitingMenuItem] = useState<string | null>(null);

  const currentSubmenu = menuItems.find((mi) => mi.labelKey === activeMenuItem);

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
        className="flex-col relative z-50 mb-5 bg-background-secondary"
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-2 flex shadow-md">
          <Link
            to="/"
            className="text-text-primary text-sm font-bold leading-tight whitespace-nowrap"
          >
            <Trans i18nKey="app-title">
              MoKri's
              <br />
              Multilingual Dictionary
            </Trans>
          </Link>
          <nav className="flex items-end justify-evenly w-full">
            {menuItems.map((item) => (
              <MenuItem
                key={item.labelKey}
                item={item}
                onHoverStart={() => handleMouseEnter(item.labelKey)}
                isActive={item.labelKey === activeMenuItem}
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
              className="absolute left-0 right-0 bg-background-secondary overflow-hidden shadow-lg"
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
                      <div className="flex justify-center" key={sub.labelKey}>
                        <Link
                          to={sub.path}
                          className="text-text-primary text-sm hover:font-semibold px-4 transition-transform duration-200 hover:scale-105"
                          onClick={handleMouseLeave}
                        >
                          {t(sub.labelKey)}
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
