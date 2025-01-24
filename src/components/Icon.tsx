interface IconProps {
    onClick: () => void;
    children: React.ReactElement;
}

export default function Icon({onClick, children}: IconProps) {
    const iconProps = {
        className: "p-1 h-7 w-8 place-items-center border border-black rounded-lg bg-green-900 text-white hover:bg-green-600",
        onClick
      };
    
    return <div {...iconProps}>
        {children}
    </div>
}