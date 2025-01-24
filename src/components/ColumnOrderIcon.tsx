import { TbArrowsSort } from "react-icons/tb";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { useState } from "react";
import { ColumnOrderIconEnum } from "../models/ColumnOrderIconEnum";
import Icon from "./Icon";

export default function ColumnOrderIcon() {
  const [sortState, setSortState] = useState<ColumnOrderIconEnum>(
    ColumnOrderIconEnum.NoSort
  );

  function clickHandler() {
    setSortState(prevState => {
        if (prevState == ColumnOrderIconEnum.NoSort) {
            return ColumnOrderIconEnum.Ascending;
        }
        else if (prevState == ColumnOrderIconEnum.Ascending) {
            return ColumnOrderIconEnum.Descending;
        }
        else {
            return ColumnOrderIconEnum.NoSort;
        }
    });
  }

  function renderIcon() {
    switch(sortState){
        case ColumnOrderIconEnum.NoSort:
            return <Icon onClick={clickHandler}><TbArrowsSort/></Icon>;
        case ColumnOrderIconEnum.Ascending:
            return <Icon onClick={clickHandler}><FaSortAmountDownAlt/></Icon>;
        case ColumnOrderIconEnum.Descending:
            return <Icon onClick={clickHandler}><FaSortAmountDown/></Icon>;
    }
  }

  return renderIcon();
}
