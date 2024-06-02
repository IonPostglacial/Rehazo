import { TaxonData } from "../datatypes/TaxonData";

function TaxonForm(props: {taxonData: TaxonData}) {
    return (
        <details open className="separated-bottom">
            <summary className="padded">Properties</summary>
            <form action="" className="form-2-col vertical-align padded">
                <label htmlFor="nameS">NS</label><input type="text" name="nameS" id="nameEn" value={props.taxonData.name} />
                <label htmlFor="author">Author</label><input type="text" name="author" id="author" value={props.taxonData.author} />
                <label htmlFor="nameCn">中文名</label><input type="text" name="nameCn" id="nameCn" value={props.taxonData.nameCn} />
                <label htmlFor="nameV">NV</label><input type="text" name="nameV" id="nameV" value={props.taxonData.nameV} />
                <label htmlFor="description">Description</label>
                <div>
                    <textarea>{props.taxonData.details}</textarea>
                </div>
            </form>
        </details>
    )
}

export default TaxonForm;