import { ReactNode } from "react";

export default function VBox(props: { children: ReactNode, className: string }) {
    return (
        <div className={"vbox " + props.className}>{props.children}</div>
    );
}