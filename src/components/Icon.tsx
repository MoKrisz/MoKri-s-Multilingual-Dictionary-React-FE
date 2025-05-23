interface IconProps {
    onClick: () => void;
    isDisabled?: boolean;
    isSelected?: boolean;
    children: React.ReactElement;
}

export default function Icon({onClick, isDisabled = false, isSelected = false, children}: IconProps) {
    const disabledStyle = isDisabled ? " opacity-75" : "";
    const backgroundColor = isSelected ? " bg-green-600" : " bg-green-900";
    const hoverStyle = isDisabled || isSelected ? "" : " hover:bg-green-600";

    const iconProps = {
        className: `p-1 h-7 w-8 place-items-center border border-black rounded-lg  text-white${disabledStyle + backgroundColor + hoverStyle}`,
        disabled: isDisabled,
        onClick
      };
    
    return <button {...iconProps}>
        {children}
    </button>
}