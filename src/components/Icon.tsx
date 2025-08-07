interface IconProps {
  onClick: () => void;
  isDisabled?: boolean;
  isSelected?: boolean;
  children: React.ReactElement;
}

export default function Icon({
  onClick,
  isDisabled = false,
  isSelected = false,
  children,
}: IconProps) {
  const disabledStyle = isDisabled ? " opacity-75" : "";
  const backgroundColor = isSelected
    ? " bg-button-background-hover"
    : " bg-button-background";
  const hoverStyle =
    isDisabled || isSelected ? "" : " hover:bg-button-background-hover";

  const iconProps = {
    className: `p-1 h-7 w-8 place-items-center border border-black rounded-lg ${
      disabledStyle + backgroundColor + hoverStyle
    }`,
    disabled: isDisabled,
    onClick,
  };

  return <button {...iconProps}>{children}</button>;
}
