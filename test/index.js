var Attr = require("../util").FileAttr,
    AdmZip = require("../adm-zip"),
    fs = require("fs");


// creating archives
var zip = new AdmZip();

// add file directly
//zip.addFile("test.txt", new Buffer("inner content of the file"), "entry comment goes here");
// add local file
//zip.addLocalFile(fs.realpathSync("./test/assets/attributes_test/blank file.txt"));
zip.addLocalFile(fs.realpathSync("./badcrc.png"));
// get everything as a buffer
var willSendthis = zip.toBuffer();
// or write everything to disk
zip.writeZip(/*target file name*/"./files.zip");

// reading archives
zip = new AdmZip("./files.zip");
var zipEntries = zip.getEntries(); // an array of ZipEntry records

zipEntries.forEach(function(zipEntry) {
    console.log(zipEntry.toString()); // outputs zip entries information
    if (zipEntry.entryName == "my_file.txt") {
        console.log(zipEntry.data.toString('utf8'));
    }
});
//// outputs the content of some_folder/my_file.txt
//console.log(zip.readAsText("some_folder/my_file.txt"));
//// extracts the specified file to the specified location
//zip.extractEntryTo(/*entry name*/"some_folder/my_file.txt", /*target path*/"/home/me/tempfolder", /*overwrite*/true)
//// extracts everything
//zip.extractAllTo(/*target path*/"/home/me/zipcontent/", /*overwrite*/true);

zip.deleteFile("test.txt");
zipEntries = zip.getEntries(); // an array of ZipEntry records

zipEntries.forEach(function(zipEntry) {
    console.log(zipEntry.toString()); // outputs zip entries information
    if (zipEntry.entryName == "my_file.txt") {
        console.log(zipEntry.data.toString('utf8'));
    }
});

zip.writeZip("./files.zip");
