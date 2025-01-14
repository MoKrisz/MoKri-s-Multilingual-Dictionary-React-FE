import { TbArrowsSort } from "react-icons/tb";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { useState } from "react";
import { ColumnOrderIconEnum } from "../models/ColumnOrderIconEnum";

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

  const iconProps = {
    className: "p-1 h-7 w-8 border border-black rounded-lg bg-green-900 fill-white hover:bg-green-600",
    onClick: clickHandler
  };

  function renderIcon() {
    switch(sortState){
        case ColumnOrderIconEnum.NoSort:
            return <TbArrowsSort {...iconProps}/>;
        case ColumnOrderIconEnum.Ascending:
            return <FaSortAmountDownAlt {...iconProps}/>;
        case ColumnOrderIconEnum.Descending:
            return <FaSortAmountDown {...iconProps}/>;
    }
  }

  return renderIcon();
}
