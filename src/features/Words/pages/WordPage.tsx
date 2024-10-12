import { useParams } from "react-router-dom";

type WordParams = {
    wordId: string;
}

export default function WordPage() {
    const param = useParams<WordParams>();

    return <h1>{param.wordId}</h1>;
}