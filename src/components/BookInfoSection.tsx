import { BookInfo } from "../datatypes/BookInfo";

function BookInfoSection(props: {bookinfo: BookInfo }) {
    return (
        <details className="separated-bottom">
            <summary className="padded">{ props.bookinfo.name }</summary>
            <form action="" className="form-2-col vertical-align padded">
                <label htmlFor="fasc">Book</label><input type="text" name="fasc" id="fasc" value={ props.bookinfo.fasc } />
                <label htmlFor="page">Page</label><input type="text" name="page" id="page" value={ props.bookinfo.page } />
                <label htmlFor="bookText">Details</label>
                <div>
                    <textarea className="text">{ props.bookinfo.details }</textarea>
                </div>
            </form>
        </details>
    )
}

export default BookInfoSection;