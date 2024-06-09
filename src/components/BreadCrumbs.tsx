import { Link } from "react-router-dom";
import { BreadCrumbData } from "../model_views/BreadCrumbData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function BreadCrumbs(props: { branch: BreadCrumbData[] }) {
    return (
        <nav className="hbox vertical-align breadcrumbs gapped">
            { props.branch.map((breadCrumb, i) =>  
            <>
                {i !== 0 ? <FontAwesomeIcon icon={faChevronRight}/>: ""}
                <Link to={breadCrumb.url} className="nowrap">{breadCrumb.label}</Link>
            </>
            ) }
        </nav>
    )
}

export default BreadCrumbs;