let JSZip = require("jszip");
let zip = new JSZip();
let JSZipUtils =  require('jszip-utils'); 
let FileSaver = require('file-saver');

const createZIP = (filename, url, index, documentsLength,zipName) => {
    JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
            throw err;
        }
        zip.file(filename, data, { binary: true });
        if (index === documentsLength) {
            zip.generateAsync({ type: 'blob' }).then(function (content) {
                FileSaver.saveAs(content, `${zipName}.zip`);
            });
        }
    });
}

export default createZIP;