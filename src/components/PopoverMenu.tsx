import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

export default function PopoverMenu(props: { label: string, children: ReactNode }) {
    return (
        <label className="popover btn">
            <input type="checkbox" />
            <span>
                <FontAwesomeIcon icon={faCaretDown} className="fa-pull-right" />
                { props.label }
            </span>
            <div className="popover-panel">
                <ul className="no-list-style">
                    {props.children}
                </ul>
            </div>
        </label>
    )
}