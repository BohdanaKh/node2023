
// ДЗ:
//     Створіть папку
// В тій папці створіть 5 папок і 5 файлів
// І за допомогою модулю fs виведіть в консоль, чи це папка чи це файл
//
// FILE: {fileName}
// FOLDER: {folderName}



const path = require('path');
const fs = require('fs');

// fs.mkdir(path.join(__dirname,'mainDirectory'),(err) => {
//     if (err) throw new Error(err.message);
// })
//
//
// fs.mkdir(path.join(__dirname,'mainDirectory','folder1'),(err) => {
//     if (err) throw new Error(err.message);
// })
// fs.mkdir(path.join(__dirname,'mainDirectory','folder2'),(err) => {
//     if (err) throw new Error(err.message);
// })
// fs.mkdir(path.join(__dirname,'mainDirectory','folder3'),(err) => {
//     if (err) throw new Error(err.message);
// })
// fs.mkdir(path.join(__dirname,'mainDirectory','folder4'),(err) => {
//     if (err) throw new Error(err.message);
// })
// fs.mkdir(path.join(__dirname,'mainDirectory','folder5'),(err) => {
//     if (err) throw new Error(err.message);
// })



// fs.writeFile(path.join(__dirname,'mainDirectory', 'folder1', 'text1.txt'),'1', (err) => {
//     if (err) throw new Error(err.message);
// })
// fs.writeFile(path.join(__dirname,'mainDirectory', 'folder2', 'text2.txt'),'2', (err) => {
//     if (err) throw new Error(err.message);
// })
// fs.writeFile(path.join(__dirname,'mainDirectory', 'folder3', 'text3.txt'),'3', (err) => {
//     if (err) throw new Error(err.message);
// })
// fs.writeFile(path.join(__dirname,'mainDirectory', 'folder4', 'text4.txt'),'4', (err) => {
//     if (err) throw new Error(err.message);
// })
// fs.writeFile(path.join(__dirname,'mainDirectory', 'folder5', 'text5.txt'),'5', (err) => {
//     if (err) throw new Error(err.message);
// })

fs.readdir(path.join(__dirname,'mainDirectory'),(err,data) => {
    if (err) throw new Error(err.message);
    console.log(data);
})


// fs.readdir(path.join(__dirname,'mainDirectory'),{withFileTypes:true}, (err, files) => {
//     if (err) throw new Error(err.message);
//     files.forEach(file => {
//         console.log(file.isFile() ? `FILE: ${file.name}` : `FOLDER: ${file.name}`);
//     })
// })




