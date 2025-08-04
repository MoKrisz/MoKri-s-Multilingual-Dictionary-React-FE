import { Link } from "react-router-dom";
import { MenuItem as MenuItemType } from "../config/nav";

interface MenuItemProps {
  item: MenuItemType;
  onHoverStart: () => void;
  onHoverEnd?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onHoverStart }) => {
  const style =
    "px-2 text-sm font-semibold text-gray-800 hover:text-black transition-colors duration-200";

  if (item.path) {
    return (
      <Link onMouseEnter={onHoverStart} className={style} to={item.path}>
        {item.label}
      </Link>
    );
  }

  return (
    <h2 onMouseEnter={onHoverStart} className={style}>
      {item.label}
    </h2>
  );
};
