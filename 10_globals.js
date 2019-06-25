"use strict";

// Requires.........................................................

const alert = require("./modules/alert");
const child_process = require("child_process");
const clipboard = require("electron").clipboard;
const fs = require("fs");
const images = require("./modules/images");
const ipcRenderer = require("electron").ipcRenderer;
const load_config = require("./modules/load_config");
const path = require("path");
const readline = require("readline");
const util = require("util");

// HTML stuff.......................................................
//
// All of this may be redundant since id-havers are in the global
// namespace automatically. But declaring them const has some value.

const boardfriends = document.getElementById("boardfriends");
const boardsquares = document.getElementById("boardsquares");
const canvas = document.getElementById("canvas");
const fenbox = document.getElementById("fenbox");
const infobox = document.getElementById("infobox");
const movelist = document.getElementById("movelist");
const pgnchooser = document.getElementById("pgnchooser");
const promotiontable = document.getElementById("promotiontable");

// Globals..........................................................

const context = canvas.getContext("2d");
const decoder = new util.TextDecoder("utf8");	// https://github.com/electron/electron/issues/18733

let config = load_config();
let tree_version = 0;

// Get the images loading...........................................

if (typeof config.override_piece_directory === "string") {
	images.load_from(config.override_piece_directory);
} else {
	images.load_from(path.join(__dirname, "pieces"));
}
