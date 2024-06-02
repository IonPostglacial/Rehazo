import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HBox from "./HBox";
import VBox from "./VBox";
import { faMinus, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Document } from "../datatypes/Document";



function TreeMenu(props: { tree: Document[] }) {
    return (
        <VBox className="height-below-top-bar">
        <header className="vbox padded separated-bottom fixed-to-top">
            <form className="hbox vertical-align relative">
                <input type="search" name="filterMenu" id="filter-menu" className="flex-fill" placeholder="filter taxons"/>
                <FontAwesomeIcon className="search-icon" icon={faSearch}/>
            </form>
            <HBox className="vertical-align">
                <HBox className="vertical-align btn-group">
                    <a href="#" className="btn toggle primary">
                        S
                    </a>
                </HBox>
                <div className="spacer"></div>
                <div className="btn-group">
                    <button><FontAwesomeIcon icon={faPlus}/>
                    </button><button><FontAwesomeIcon icon={faMinus}/></button>
                </div>
            </HBox>
        </header>
        <ul className="vertical-scroll text no-list-style">
            {props.tree.map(doc =>
                <li>
                    <a href="#" className="clickable">
                        <HBox className="highlight-on-hover round">
                            {doc.path.map(_ =>
                                <div className="indented"></div>
                            )}
                            <div>{ doc.name }</div>
                        </HBox>
                    </a>
                </li>
            )}
        </ul>
    </VBox>
    );
}

export default TreeMenu;