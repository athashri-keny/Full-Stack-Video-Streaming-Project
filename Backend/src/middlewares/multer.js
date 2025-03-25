import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// 1. Set up basic paths
const currentDir = path.resolve(); // Gets root project directory
const tempFolder = path.join(currentDir, 'public', 'temp'); // Full path to temp folder

// 2. Create temp folder if missing
fs.mkdirSync(tempFolder, { recursive: true }); // Creates all folders in the path

// 3. Configure file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempFolder); // Save files to public/temp
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

// 4. Create the upload middleware
export const upload = multer({
    storage,
   
});