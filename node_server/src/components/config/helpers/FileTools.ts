class FileTools {
    text: string;

    readSingleFile(e) {
        var fileName = e;
        if (!fileName) {
            return;
        }
        var reader = new FileReader();
        reader.onload = file => {
            var contents: any = file.target;
        };
        reader.readAsText(fileName);
    }
}