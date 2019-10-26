export const saveFile = (): any => {
    const b: any = new Blob(['Hello, World!'], { type: 'text/plain' });
    const url = window.URL.createObjectURL(b);

    console.log(b, url, window.open(url));
};
