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
import BookInfoSection from "../components/BookInfoSection";
import BreadCrumbs from "../components/BreadCrumbs";
import IconMenu from "../components/IconMenu";
import TaxonSummary from "../components/TaxonSummary";
import { TaxonData } from "../datatypes/TaxonData";
import { ViewMenuData } from "../datatypes/ViewMenuData";
import { BreadCrumbData } from "../datatypes/BreadCrumbData";
import { BookInfo } from "../datatypes/BookInfo";
import { Picture } from "../datatypes/Picture";
import { DescriptorIconData } from "../datatypes/DescriptorIconData";
import { TaxonSummarySection } from "../datatypes/TaxonSummarySection";

type TaxonViewData = { 
    currentDatasetName: string, 
    datasets: DatasetItem[], 
    tree: Document[], 
    taxonData: TaxonData,
    views: ViewMenuData[],
    descriptorBreadcrumbs: BreadCrumbData[],
    bookInfos: BookInfo[],
    pictures: Picture[],
    descriptorsIconData: DescriptorIconData[],
    summarySections: TaxonSummarySection[],
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
    const bookInfos = [
        { name: "Flores de Madagascar et Comores", details: "blabla", fasc: 1, page: 1 },
        { name: "Commentaires de voyages de Henry", details: "toto blaba", fasc: 3, page: 42 },
    ];
    const pictures = [
        { name: "Tree", url: "toto.png", hubUrl: "tata.png" },
        { name: "Flower", url: "flower.png", hubUrl: "flower.png" },
    ];
    const descriptorsIconData = [
        { url: "", pictureSource: "", name: "Fruit", name_tr: [], isSelected: true },
        { url: "", pictureSource: "", name: "Flower", name_tr: [], isSelected: false },
    ];
    const summarySections: TaxonSummarySection[] = [
        { name: "Flower", name_tr: [], color: "pink", 
            descriptors: [
                { name: "petales", name_tr: [], 
                    states: [
                        { name: "opposés", name_tr: [] },
                    ],
                }
            ],
        },
    ];
    return { currentDatasetName, datasets, tree, taxonData, views, descriptorBreadcrumbs, bookInfos, pictures, descriptorsIconData, summarySections };
}

function TaxonView() {
    const { 
        currentDatasetName, 
        datasets, tree, taxonData, views, descriptorBreadcrumbs, 
        bookInfos, pictures, descriptorsIconData, summarySections,
    } = useLoaderData() as TaxonViewData;
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
                            <PictureBox picture={pictures[0]} index={1} count={pictures.length}></PictureBox>
                        </details>
                        <TaxonForm taxonData={taxonData}></TaxonForm>
                        {bookInfos.map(bookinfo =>
                            <BookInfoSection bookinfo={bookinfo}></BookInfoSection>
                        )}
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
                                    <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                                </HBox>
                                <HBox v-if="descriptorsBreadCrumb.length > 0" className="vertical-align relative"
                                    hx-boost="true">
                                    <a href="/ds/{{ .DatasetName }}/taxons/{{ .SelectedTaxon.Ref }}" className="btn">
                                    <FontAwesomeIcon icon={faHome}/>
                                    </a>
                                    <BreadCrumbs branch={descriptorBreadcrumbs}></BreadCrumbs>
                                </HBox>
                            </VBox>
                            <IconMenu descriptors={descriptorsIconData}></IconMenu>
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
                        <TaxonSummary sections={summarySections}></TaxonSummary>
                    </VBox>
                </HBox>
            </VBox>
        </HBox>
    );
}

export default TaxonView;