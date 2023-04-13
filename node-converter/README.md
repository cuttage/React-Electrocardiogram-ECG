# ECG Data Visualization in React (NextJS) 📈💕 - Node.js Scripts for Data Pre-processing

> Node v16.14.2

> In the 'src' directory of the 'next-app' application, delete the existing 'coordsData' folder and replace it with the newly generated 'coordsData' folder, provided that the instructions in this guide have been carefully followed.

To execute a Node.js script, enter the command node `<nameOfTheFile>.js` in the console.

The compressed .7z file has been extracted using a utility and the resulting file is file.txt. The original .7z file is not provided but can be found here: [Repo](https://github.com/idoven/frontend-challenge/tree/main/data)

The data will be processed from the extracted file, that needs to be renamed to file.txt file and placed at the root of node-converter. Include this file first.

Execute the scripts in the listed order.

## Run trimmedData.js

`node trimmedData.js`

The code generates and saves the data.json file successfully, but throws an error at the end that requires additional investigation.

After the process completes successfully, open the data.json file using a high-performance editor like Hex Fiend on Mac OS to confirm that the file contains an array of objects in valid JSON format.

Note that the data size is restricted to 2GB due to issues encountered with the fs module when dealing with larger files.

## Run dividedData.js

`node dividedData.js`

## Run toJsonObj.js

`node toJsonObj.js`

Open a sample file located in the data folder with a high-performance editor, verify that it conforms to the structure `{ "data" : [...objects]}`, check for any inconsistencies, and save the file.

## Run structuredData.js

`node structuredData.js`

## Run listedFileNames.js

`node listedFileNames.js`

To relocate the "coordsData" and "list" folders to the "src" directory and remove any other generated items can be done by executing the following instructions.

- Move the "coordsData" folder to the "src" directory.
- Move the "list" folder to the "src" directory.
- Delete any other generated items that are not necessary.
