import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// Get directory name in ES modules
const __dirname = path.resolve();

// Configure absolute path for uploads
const tempDir = path.join(__dirname, 'public', 'temp');

// Create directory if it doesn't exist
fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir); // Use absolute path
    },
    filename: function (req, file, cb) {
        // Add timestamp to filename to prevent collisions
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

export const upload = multer({ 
    storage,
    limits: { fileSize: 100 * 1024 * 1024 } // Example: 100MB limit
});