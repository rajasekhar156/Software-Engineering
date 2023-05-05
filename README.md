# Camera based vehicle entry system for IITH


## Installation Required 
### 1. OpenALPR software
OpenALPR is an open source Automatic License Plate Recognition library written in C++ with bindings in C#, Java, Node.js, Go, and Python. The library analyzes images and video streams to identify license plates. The output is the text representation of any license plate characters.
 
Installation:

Install OpenALPR on Ubuntu with the following commands:
```bash
  sudo apt-get update && sudo apt-get install openalpr
```
OpenALPR requires the following additional libraries:

* [Tesseract OCR v3.0.4](https://github.com/tesseract-ocr/tesseract).

* [OpenCV v2.4.8+](https://opencv.org/)

After cloning this GitHub repository, you should download and extract Tesseract and OpenCV source code into their own directories. Compile both libraries.

For any queries related to OpenALPR software refer to [this](https://github.com/abhishekworkspace/openalpr_lic).

### 2. FrontEnd Libraries
Head to Frontend folder and type the following in the terminal.
```bash
  npm install
```
All modules listed as dependencies in package.json inside the Frontend library will be installed.

### 3. BackEnd Libraries
Head to Backend folder and type the following in the terminal.
```bash
  npm install
```
All modules listed as dependencies in package.json inside the Backend library will be installed.
## Deployment
1. Open a terminal and change the directory to ./Backend
```bash
  npm start
```
2. Open a new terminal and change the directory to ./Frontend
```bash
  npm start
```
3. Open a new terminal and change the directory to ./openalpr/src
```bash
  ./bash.sh
```
Input the image file name (present in the src folder in the openalpr directory).

## Testing
To run the tests, head to the corresponding folder and run the following command.
```bash
  npm run test
```

## Authors
1. Itreddy Raja Sekhar - CS20BTECH11020
2. Thota Rohan - CS20BTECH11064
3. Danda Sai Pravallika - CS20BTECH11013
4. Mannam Sarandeep - CS20BTECH11030

This project is done under the guidance of Dr.Jyoti Vedurada, Dr. MV Panduranga Rao, Dr. Antony Franklin.
