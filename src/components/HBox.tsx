import { ReactNode } from "react";

export default function HBox(props: { children: ReactNode, className: string }) {
    return (
        <div className={"hbox " + props.className}>{props.children}</div>
    );
}