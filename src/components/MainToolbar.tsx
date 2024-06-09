import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HBox from "./HBox"
import { faBars, faClose, faFileExport, faFileImport, faHome, faPrint, faSave } from "@fortawesome/free-solid-svg-icons";
import PopoverMenu from "./PopoverMenu";
import PopoverMenuItem from "./PopoverMenuItem";
import UploadButton from "./UploadButton";
import { DatasetItem } from "../model_views/DatasetItem";

function importFile(f: File) {
    alert("import: " + f.name);
}

export default function MainToolbar(props: { datasets: DatasetItem[], currentDatasetName: string }) {
    return (
        <HBox className="top-bar-height vertical-align padded separated-bottom">
            <HBox hx-boost="true" className="btn-group vertical-align">
                <a className="btn" href="/" title="home"><FontAwesomeIcon icon={faHome}/></a>
                <PopoverMenu label={props.currentDatasetName}>
                    {props.datasets.map(ds => 
                        <PopoverMenuItem v-for="dataset of datasets" label={ds.name} url={"/ds/"+ds.name}></PopoverMenuItem>
                    )}
                </PopoverMenu>
            </HBox>
            <div className="separator"></div>
            <HBox className="btn-group vertical-align">
                <button title="save" className="success"><FontAwesomeIcon icon={faSave}/></button>
                <UploadButton onUpload={importFile}><FontAwesomeIcon icon={faFileImport}/></UploadButton>
                <button title="export"><FontAwesomeIcon icon={faFileExport} /></button>
                <button title="print"><FontAwesomeIcon icon={faPrint}/></button>
            </HBox>
            <div className="spacer"></div>
            <button><FontAwesomeIcon icon={faBars}/></button>
            <div className="separator"></div>
            <button><FontAwesomeIcon icon={faClose}/></button>
        </HBox>
    );
}