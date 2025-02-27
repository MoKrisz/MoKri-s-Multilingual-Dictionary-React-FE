import { Dispatch } from "react";
import { SearchWordsAction, SearchWordsState } from "../state/searchWordsReducer";

interface SearchWordsProps{
    state: SearchWordsState;
    dispatch: Dispatch<SearchWordsAction>;
}

export default function WordsSearchBar({state, dispatch}: SearchWordsProps) {
    return <>
    </>
}
