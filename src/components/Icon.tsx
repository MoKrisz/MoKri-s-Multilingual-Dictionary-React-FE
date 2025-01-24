interface IconProps {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactElement;
}

export default function Icon({onClick, disabled, children}: IconProps) {
    const iconProps = {
        className: `p-1 h-7 w-8 place-items-center border border-black rounded-lg bg-green-900 text-white ${disabled ? "opacity-75" : "hover:bg-green-600"}`,
        disabled,
        onClick
      };
    
    return <div {...iconProps}>
        {children}
    </div>
}