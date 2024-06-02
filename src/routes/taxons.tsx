import { useLoaderData } from "react-router-dom";
import HBox from "../components/HBox";
import MainToolbar from "../components/MainToolbar";
import VBox from "../components/VBox";
import { DatasetItem } from "../datatypes/DatasetItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faHome, faMagnifyingGlass, faSearch } from "@fortawesome/free-solid-svg-icons";
import TreeMenu from "../components/TreeMenu";
import { Document } from "../datatypes/Document";
import Navbar from "../components/Navbar";
import PictureBox from "../components/PictureBox";
import TaxonForm from "../components/TaxonForm";
import BookInfo from "../components/BookInfo";
import BreadCrumbs from "../components/BreadCrumbs";
import IconMenu from "../components/IconMenu";
import TaxonSummary from "../components/TaxonSummary";
import { TaxonData } from "../datatypes/TaxonData";
import { ViewMenuData } from "../datatypes/ViewMenuData";
import { BreadCrumbData } from "../datatypes/BreadCrumbData";

type TaxonViewData = { 
    currentDatasetName: string, 
    datasets: DatasetItem[], 
    tree: Document[], 
    taxonData: TaxonData,
    views: ViewMenuData[],
    descriptorBreadcrumbs: BreadCrumbData[],
};

export async function loader(): Promise<TaxonViewData> {
    const datasets = [
        { name: "Baobabs", lastModified: "2021-04-21" },
        { name: "Plantes", lastModified: "2022-04-21" },
    ];
    const currentDatasetName = "Baobabs";
    const tree = [
        { path: ["t1"], name: "Acanthaceae" },
        { path: ["t1", "t2"], name: "Justicia" },
        { path: ["t1", "t3"], name: "Baleria" },
        { path: ["t2"], name: "Acariaceae" },
    ];
    const taxonData: TaxonData = {
        branch: [{label: "Acanthaceae", url: "#"}, {label: "Justicia", url: "#"}],
        name: "Justicia SP",
        nameV: "B",
        nameCn: "C",
        author: "Henry",
        details: "blabla",
    };
    const views: ViewMenuData[] = [
        { label: "Taxons", url: "ds/xxxx/taxons" },
        { label: "Characters", url: "ds/xxxx/characters" },
    ];
    const descriptorBreadcrumbs = [
        {label: "Flower", url: "#"}, 
        {label: "Flowering", url: "#"},
    ];
    return { currentDatasetName, datasets, tree, taxonData, views, descriptorBreadcrumbs };
}

function TaxonView() {
    const { currentDatasetName, datasets, tree, taxonData, views, descriptorBreadcrumbs } = useLoaderData() as TaxonViewData;
    const unselectedPanels = [{name: "yo"}];
    return (
        <HBox className="responsive-850">
            <VBox className="separated-right">
                <MainToolbar currentDatasetName={currentDatasetName} datasets={datasets}></MainToolbar>
                <TreeMenu tree={tree}></TreeMenu>
            </VBox>
            <VBox className="flex-fill">
                <HBox className="top-bar-height vertical-align separated-bottom padded">
                    <Navbar selectedViewName="Taxons" branch={taxonData.branch} views={views}></Navbar>
                    <div className="spacer"></div>
                    <div className="btn-group" hx-boost="true">
                        { unselectedPanels.map(panel =>
                            <a href="panel.addUrl" className="btn">{ panel.name }</a>
                        ) }
                    </div>
                </HBox>
                <HBox className="relative height-below-top-bar responsive-1100 flex-fill separated-children">
                    <VBox v-if="isPanelVisible('Properties')" className="vertical-scroll flex-fill">
                        <HBox className="vertical-align padded separated-bottom fixed-to-top">
                            <h1>Properties</h1>
                            <div className="spacer"></div>
                            <div className="btn-group">
                                <a className="btn" href="{{ panelZoomUrl 1 }}" hx-get="{{ panelZoomUrl 1 }}"
                                    hx-target="#doc-content" hx-select="#doc-content" hx-swap="outerHTML"
                                    hx-push-url="true">
                                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                </a><a className="btn" href="{{ panelRemoveUrl 1 }}" hx-get="{{ panelRemoveUrl 1 }}"
                                    hx-target="#doc-content" hx-select="#doc-content" hx-swap="outerHTML"
                                    hx-push-url="true">
                                    <FontAwesomeIcon icon={faClose}/>
                                </a>
                            </div>
                        </HBox>
                        <details open className="separated-bottom">
                            <summary className="padded">Pictures</summary>
                            <PictureBox></PictureBox>
                        </details>
                        <TaxonForm taxonData={taxonData}></TaxonForm>
                        <BookInfo></BookInfo>
                    </VBox>
                    <VBox v-if="isPanelVisible('Descriptors')" className="vertical-scroll flex-fill">
                        <HBox className="vertical-align padded separated-bottom fixed-to-top">
                            <h1>Descriptors</h1>
                            <div className="spacer"></div>
                            <div className="btn-group">
                                <a className="btn" href="{{ panelZoomUrl 2 }}" hx-get="{{ panelZoomUrl 2 }}"
                                    hx-target="#doc-content" hx-select="#doc-content" hx-swap="outerHTML"
                                    hx-push-url="true">
                                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                </a><a className="btn" href="{{ panelRemoveUrl 2 }}" hx-get="{{ panelRemoveUrl 2 }}"
                                    hx-target="#doc-content" hx-select="#doc-content" hx-swap="outerHTML"
                                    hx-push-url="true">
                                    <FontAwesomeIcon icon={faClose}/>
                                </a>
                            </div>
                        </HBox>
                        <VBox className="flex-fill">
                            <VBox className="fixed-to-top separated-bottom padded">
                                <HBox className="vertical-align relative">
                                    <input type="search" name="filter-descriptors" id="filter-descriptors" className="flex-fill"
                                        placeholder="filter descriptors" />
                                    <FontAwesomeIcon icon={faSearch}/>
                                </HBox>
                                <HBox v-if="descriptorsBreadCrumb.length > 0" className="vertical-align relative"
                                    hx-boost="true">
                                    <a href="/ds/{{ .DatasetName }}/taxons/{{ .SelectedTaxon.Ref }}" className="btn">
                                    <FontAwesomeIcon icon={faHome}/>
                                    </a>
                                    <BreadCrumbs branch={descriptorBreadcrumbs}></BreadCrumbs>
                                </HBox>
                            </VBox>
                            <IconMenu v-if="selectedTaxon"></IconMenu>
                        </VBox>
                    </VBox>
                    <VBox v-if="isPanelVisible('Summary')" className="vertical-scroll flex-fill">
                        <HBox className="vertical-align padded separated-bottom fixed-to-top">
                            <h1>Summary</h1>
                            <div className="spacer"></div>
                            <div className="btn-group">
                                <a className="btn" href="{{ panelZoomUrl 4 }}" hx-get="{{ panelZoomUrl 4 }}"
                                    hx-target="#doc-content" hx-select="#doc-content" hx-swap="outerHTML"
                                    hx-push-url="true">
                                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                </a><a className="btn" href="{{ panelRemoveUrl 4 }}" hx-get="{{ panelRemoveUrl 4 }}"
                                    hx-target="#doc-content" hx-select="#doc-content" hx-swap="outerHTML"
                                    hx-push-url="true">
                                    <FontAwesomeIcon icon={faClose}/>
                                </a>
                            </div>
                        </HBox>
                        <TaxonSummary></TaxonSummary>
                    </VBox>
                </HBox>
            </VBox>
        </HBox>
    );
}

export default TaxonView;