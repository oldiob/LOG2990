
export const saveFile = (fileName: string, fileContent: string): any => {
    const dataBlob: any = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(dataBlob);
    downloadUrl(fileName, url);
};

const downloadUrl = (fileName: string, url: string): void => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.rebase`;
    a.click();
};

export const saveFileSVG = (fileName: string, fileContent: string): any => {
    const svg = document.createElement('svg');
    svg.innerHTML = fileContent;
    const dataBlob: any = new Blob([svg.innerHTML], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(dataBlob);
    downloadSVG(fileName, url);
};

const downloadSVG = (fileName: string, url: string): void => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.svg`;
    a.click();
};
