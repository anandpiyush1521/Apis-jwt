// utils/logger.js
import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

// Define the custom format for log messages
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Create the logger instance
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize(), // Colorize the output
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamps
        logFormat // Apply custom format
    ),
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
        new winston.transports.File({ filename: 'logs/combined.log' }) // Log all messages to a file
    ]
});

// Export the logger instance
export default logger;
