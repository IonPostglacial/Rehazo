import { Link, useLoaderData } from "react-router-dom";
import { DatasetItem } from "../datatypes/DatasetItem";


type RootData = { datasets: DatasetItem[] };

export async function loader(): Promise<RootData> {
    const datasets = [
        { name: "Baobabs", lastModified: "2021-04-21" },
        { name: "Plantes", lastModified: "2022-04-21" },
    ];
    return { datasets };
}

function Root() {
    const { datasets } = useLoaderData() as RootData;
    return (
        <>
            <div className="single-content vbox">
                <div className="vbox flex-fill">
                    <div className="hbox top-bar-height separated-bottom vertical-align padded">
                        <h1>List of Datasets</h1>
                    </div>
                    <table>
                        {datasets.map(ds =>
                            <tr>
                                <td>{ds.name}</td>
                                <td><Link to={`/ds/${ds.name}/taxons`}>open</Link></td>
                                <td>{ds.lastModified}</td>
                            </tr>
                        )}
                    </table>
                    <form action="/upload" id="upload-form" method="post" encType="multipart/form-data" className="form-2-col vertical-align padded">
                        <label htmlFor="upload">Chose file</label>
                        <input type="file" name="upload" id="upload" accept="application/zip"></input>
                    </form>
                    <div>
                        <div id="upload-msg"></div>
                        <input type="submit" name="upload-btn" value="Upload" form="upload-form" hx-select="upload-msg" hx-target="upload-msg"></input>
                        <div className="spacer"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Root;