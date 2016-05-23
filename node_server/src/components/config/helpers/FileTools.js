class FileTools {
    readSingleFile(e) {
        var fileName = e;
        if (!fileName) {
            return;
        }
        var reader = new FileReader();
        reader.onload = file => {
            var contents = file.target;
        };
        reader.readAsText(fileName);
    }
}
//# sourceMappingURL=FileTools.js.map