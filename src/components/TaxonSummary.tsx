import { TaxonSummarySection } from "../model_views/TaxonSummarySection";

function TaxonSummary(props: { sections: TaxonSummarySection[] }) {
    return (
        <ul className="padded flex-fill vbox gapped no-list-style">
        {props.sections.map(section =>
            <li className="padded text rounded" style={ { backgroundColor: section.color } }>
                <ul className="hbox gapped no-list-style wrap">
                    <li>{ section.name }</li>
                    { section.name_tr.map(tr =>
                        <li>{ tr }</li>
                    )}
                </ul>
                <ul className="padded flex-fill vbox gapped no-list-style">
                    { section.descriptors.map(descriptor =>
                        <li>
                            <ul className="hbox gapped no-list-style wrap">
                                <li>{ descriptor.name }</li>
                                { descriptor.name_tr.map(tr =>
                                    <li>{ tr }</li>
                                )}
                            </ul>
                            <ul className="no-list-style indented">
                            { descriptor.states.map(state => 
                                <li className="padded" style={ { backgroundColor: state.color } }>
                                <ul className="hbox gapped no-list-style wrap">
                                    <li>{ state.name }</li>
                                    { state.name_tr.map(tr => 
                                        <li>{ tr }</li>
                                    )}
                                </ul>
                            </li>
                            )}
                            </ul>
                        </li>
                    )}
                    </ul>
            </li>
        )}
        </ul>
    )
}

export default TaxonSummary;