import { Link } from "react-router-dom";
import { MenuItem as MenuItemType } from "../config/nav";

interface MenuItemProps {
  item: MenuItemType;
  onHoverStart: () => void;
  onHoverEnd?: () => void;
  isActive: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  item,
  onHoverStart,
  isActive,
}) => {
  const style = `px-2 text-text-primary text-sm font-semibold text-gray-800 transition-transform duration-200 ${
    isActive ? "scale-110" : ""
  }`;

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
