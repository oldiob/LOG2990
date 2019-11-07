
export const saveFile = (fileName: string, fileContent: string, extension?: string): any => {
    console.log(fileContent);
    const dataBlob: any = new Blob([fileContent], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(dataBlob);
    downloadUrl(fileName, url, extension);
};

const downloadUrl = (fileName: string, url: string, extension?: string): void => {
    let ext = 'rebase';
    if (extension) {
        ext = extension;
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${ext}`;
    a.click();
};

export const saveFileSVG = (fileName: string, fileContent: string): any => {
    // const svg = document.createElement('svg');
    // svg.innerHTML = fileContent;
    const dataBlob: any = new Blob([fileContent], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(dataBlob);
    downloadSVG(fileName, url);
};

const downloadSVG = (fileName: string, url: string): void => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.svg`;
    a.click();
};
