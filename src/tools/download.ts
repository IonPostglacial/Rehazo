export default function download(content: any, extension: string, name: string|undefined=undefined,binary=false) {
    const filename = (name ?? window.prompt("Choose a file name", "export")) + `.${extension}`;
    const element = document.createElement("a");
    const url = binary ? URL.createObjectURL(content) : ("data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("href", url);
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}