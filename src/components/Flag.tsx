import "flag-icons/css/flag-icons.min.css";

interface FlagProps {
  flagCode: string;
}

const Flag: React.FC<FlagProps> = ({ flagCode }) => {
  return <span className={`fi fi-${flagCode}`} />;
};

export default Flag;
