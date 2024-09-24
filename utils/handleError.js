import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const handleError = (error, path) => {
    let dbError = [];
    
    try {
        dbError = JSON.parse(readFileSync(path));
    } catch (e) {
       
        dbError = [];
    }
    
    const newError = {
        id: randomUUID(),
        type: error.message,
        date: new Date().toISOString(),
        stack: error.stack 
    };

    dbError.push(newError);
    
    try {
        writeFileSync(path, JSON.stringify(dbError));
    } catch (e) {
        console.error("Error writing to error log:", e);
    }
    
    return newError;
};

export { handleError };