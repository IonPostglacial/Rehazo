import { Link } from "react-router-dom";

export default function PopoverMenuItem(props: { url: string, label: string }) {
    return (
        <li>
            <Link to={props.url}>{props.label}</Link>
        </li>
    );
}