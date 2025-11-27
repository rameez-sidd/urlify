import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import os from "os";
import process from "process";

export const healthCheckController = asyncHandler(async (req, res) => {
    const healthData = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        system: getSystemDetails(),
        uptime: getUptimeDetails(),
        process: getProcessDetails(),
        memory: getMemoryUsage(),
        load: getLoadAverage()
    };

    res.status(200).json(
        new ApiResponse(200, healthData, "Health Check done")
    );

})

// Helper functions
function getSystemDetails() {
    return {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        cpus: os.cpus().length,
        cpuModel: os.cpus()[0]?.model,
        totalMemory: `${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`,
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
    };
}

function getUptimeDetails() {
    return {
        processUptime: `${Math.floor(process.uptime())} seconds`,
        systemUptime: `${Math.floor(os.uptime())} seconds`,
        processUptimeHuman: formatUptime(process.uptime()),
        systemUptimeHuman: formatUptime(os.uptime())
    };
}

function getProcessDetails() {
    return {
        pid: process.pid,
        ppid: process.ppid,
        memoryUsage: process.memoryUsage(),
        nodeArgs: process.argv,
        execPath: process.execPath
    };
}

function getMemoryUsage() {
    const formatMemory = (bytes) => `${Math.round(bytes / (1024 * 1024))} MB`;

    const processMemory = process.memoryUsage();
    return {
        process: {
            rss: formatMemory(processMemory.rss),
            heapTotal: formatMemory(processMemory.heapTotal),
            heapUsed: formatMemory(processMemory.heapUsed),
            external: formatMemory(processMemory.external)
        },
        system: {
            free: formatMemory(os.freemem()),
            total: formatMemory(os.totalmem()),
            usage: `${Math.round((1 - os.freemem() / os.totalmem()) * 100)}%`
        }
    };
}

function getLoadAverage() {
    const load = os.loadavg();
    return {
        '1min': load[0],
        '5min': load[1],
        '15min': load[2],
        loadPerCore: {
            '1min': (load[0] / os.cpus().length).toFixed(2),
            '5min': (load[1] / os.cpus().length).toFixed(2),
            '15min': (load[2] / os.cpus().length).toFixed(2)
        }
    };
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}