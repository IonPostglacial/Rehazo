import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Picture } from "../datatypes/Picture";
import { faArrowLeft, faArrowRight, faFileLines, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import VBox from "./VBox";
import HBox from "./HBox";

function PictureBox(props: { picture: Picture, index: number, count: number }) {
    return (
        <VBox>
            <a className="hbox horizontal-align text" id="pictureLink">
                <img className="illustration" src={ props.picture.hubUrl } alt="Some plant"></img>
            </a>
            <dialog id="pictureDialog">
                <VBox>
                    <HBox className="vertical-align padded separated-bottom">
                        <h1>{ props.picture.name }</h1>
                        <div className="spacer"></div>
                        <button autoFocus id="pictureDialogCloseBtn"><i className="fa-solid fa-close"></i></button>
                    </HBox>
                    <img className="fullscreen-img" src={ props.picture.hubUrl } alt="Some plant"></img>
                </VBox>
            </dialog>
            <HBox className="hbox vertical-align padded">
                <div className="btn-group">
                    <button><FontAwesomeIcon icon={faArrowLeft}/>
                    </button><button><FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
                <div className="padded nowrap">{ props.index } / { props.count }</div>
                <button><FontAwesomeIcon icon={faUpload}/></button>
                <input type="text" className="flex-fill" placeholder="add a picture" />
                <button><FontAwesomeIcon icon={faFileLines}/></button>
                <button className="primary"><FontAwesomeIcon icon={faPlus}/></button>
            </HBox>
        </VBox>
    )
}

export default PictureBox;