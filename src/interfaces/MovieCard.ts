import movie from "./Movie";

export default interface movieCardProps {
    movie:movie
    layout?: "row"|"tile"
    onSelect:(id:string)=>void;
}