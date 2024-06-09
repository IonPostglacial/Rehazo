import { BreadCrumbData } from "../model_views/BreadCrumbData";
import { ViewMenuData } from "../model_views/ViewMenuData";
import BreadCrumbs from "./BreadCrumbs";
import PopoverMenu from "./PopoverMenu";
import PopoverMenuItem from "./PopoverMenuItem";

function Navbar(props: { selectedViewName: string, views: ViewMenuData[], branch: BreadCrumbData[] }) {
    return (
        <div className="btn-group hbox vertical-align">
            <PopoverMenu label={props.selectedViewName}>
                {props.views.map(view =>
                    <PopoverMenuItem label={view.label} url={view.url}/>
                )}
            </PopoverMenu>
            <BreadCrumbs branch={props.branch}></BreadCrumbs>
        </div>
    )
}

export default Navbar;