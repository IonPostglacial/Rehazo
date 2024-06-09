import { DescriptorIconData } from "../model_views/DescriptorIconData";

function IconMenu(props: { descriptors: DescriptorIconData[] }) {
    return (
        <div className="dynamic-grid gapped wrap padded horizontal-align vertical-align" hx-boost="true">
        { props.descriptors.map(descriptor =>
            <a href={ descriptor.url } className={"separated square text padded stack-container" + (descriptor.isSelected ? " selected" : "") }>
                <div className="background-contained transparent" style={ { backgroundImage: `url('${descriptor.pictureSource}')` } }></div>
                <div className="transparent vbox horizontal-align justify-space-around">
                    <div className="text-over-img">{ descriptor.name }</div>
                    { descriptor.name_tr.map(tr =>
                        <div className="text-over-img">{ tr }</div>
                    )}
                </div>
            </a>
        )}
        </div>
    )
}

export default IconMenu;