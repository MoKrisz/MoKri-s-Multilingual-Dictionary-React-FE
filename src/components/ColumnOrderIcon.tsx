import { TbArrowsSort } from "react-icons/tb";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { ColumnOrderEnum } from "../models/ColumnOrderEnum";
import Icon from "./Icon";

interface ColumnOrderIconProps {
  sortingState: ColumnOrderEnum;
  clickHandler: () => void;
}

export default function ColumnOrderIcon({sortingState, clickHandler}: ColumnOrderIconProps) {
    function renderIcon() {
    switch(sortingState){
        case ColumnOrderEnum.NoSort:
            return <Icon onClick={clickHandler}><TbArrowsSort/></Icon>;
        case ColumnOrderEnum.Ascending:
            return <Icon onClick={clickHandler}><FaSortAmountDownAlt/></Icon>;
        case ColumnOrderEnum.Descending:
            return <Icon onClick={clickHandler}><FaSortAmountDown/></Icon>;
    }
  }

  return renderIcon();
}
