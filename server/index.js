import express from "express";
import mysql from "mysql2/promise";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const envSource = readFileSync(filePath, "utf8");

  for (const line of envSource.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();

    if (!key || process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }
}

loadEnvFile(path.resolve(rootDir, ".env"));
loadEnvFile(path.resolve(rootDir, `.env.${process.env.NODE_ENV || "development"}`));

const app = express();
const serverConfig = {
  port: Number(process.env.PORT || 4000),
};

const mysqlConfig = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || "wkylin",
  password: process.env.MYSQL_PASSWORD || "wkylin_password",
  database: process.env.MYSQL_DATABASE || "wkylin_site",
  waitForConnections: true,
  connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 8),
};

async function createPool() {
  return mysql.createPool(mysqlConfig);
}

const poolPromise = createPool();

async function fallbackProfile() {
  const dataPath = path.resolve(__dirname, "../src/profileData.ts");
  const source = await readFile(dataPath, "utf8");
  const jsonLike = source
    .replace(/export type[\s\S]*?;\n\n/g, "")
    .replace("export const profileData: ProfileData = ", "")
    .replace(/;\s*$/, "");
  return Function(`"use strict"; return (${jsonLike});`)();
}

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, service: "wkylin-personal-site" });
});

app.get("/api/profile", async (_request, response) => {
  try {
    const pool = await poolPromise;
    const [rows] = await pool.query(
      "SELECT payload FROM site_profile WHERE slug = ? LIMIT 1",
      ["wkylin"],
    );
    const row = Array.isArray(rows) ? rows[0] : undefined;

    if (row?.payload) {
      response.json(typeof row.payload === "string" ? JSON.parse(row.payload) : row.payload);
      return;
    }
  } catch (error) {
    console.warn("[api] mysql profile fallback", error.message);
  }

  response.json(await fallbackProfile());
});

app.listen(serverConfig.port, () => {
  console.log(`WKylin API listening on http://127.0.0.1:${serverConfig.port}`);
});
