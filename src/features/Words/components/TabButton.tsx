interface WordFormParams {
  setActiveTab?: () => void;
  label: string;
  className: string;
}

export default function TabButton({setActiveTab, label, className}: WordFormParams)
{
    return <button onClick={setActiveTab} className={className}>
        {label}
    </button>
}