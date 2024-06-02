import { ChangeEvent, MutableRefObject, ReactNode, useRef } from "react";

export default function UploadButton(props: { onUpload: (f: File) => void, children: ReactNode }) {
    const opener: MutableRefObject<HTMLInputElement|null> = useRef(null);

    function uploadFile() {
        opener?.current?.click();
    }
    
    function fileUpload(e: ChangeEvent<HTMLInputElement>) {
        if (!(e.target instanceof HTMLInputElement)) { return; }
        if (e.target.files === null || e.target.files.length === 0) { return; }
    
        props.onUpload(e.target.files[0]);
    }

    return (
        <>
            <button type="button" onClick={uploadFile}>{props.children}</button>
            <input ref={opener} className="display-none" onChange={fileUpload} type="file" name="name" accept="accept"></input>
        </>
    );
}