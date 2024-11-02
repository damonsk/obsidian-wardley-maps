import { readFileSync, writeFileSync } from "fs";

//const targetVersion = process.env.npm_package_version;

// read minAppVersion from manifest.json and bump version to target version
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
console.log(manifest.version);
let oldVersion = manifest.version.split(".");
const targetVersion = oldVersion[0] + "." + oldVersion[1] + "." + (parseInt(oldVersion[2]) + 1);
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// update versions.json with target version and minAppVersion from manifest.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
