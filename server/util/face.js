'use strict';
const faceapi = require('face-api.js');
require('@tensorflow/tfjs-node');

var canvas = require('canvas');
// require('@tensorflow/tfjs-node');

const faceDetectionNet = faceapi.nets.tinyFaceDetector;
var Canvas = canvas.Canvas;
var Image = canvas.Image;
var ImageData = canvas.ImageData;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// SsdMobilenetv1Options
const minConfidence = 0.5;
// TinyFaceDetectorOptions
const inputSize = 416;
const scoreThreshold = 0.5;
// MtcnnOptions
const minFaceSize = 50;
const scaleFactor = 0.8;

function getFaceDetectorOptions (net) {
	return net === faceapi.nets.ssdMobilenetv1
		? new faceapi.SsdMobilenetv1Options({ minConfidence })
		: (net === faceapi.nets.tinyFaceDetector
			? new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
			: new faceapi.MtcnnOptions({ minFaceSize, scaleFactor }));
}

const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet);

module.exports = { faceDetectionNet, faceDetectionOptions, canvas };
