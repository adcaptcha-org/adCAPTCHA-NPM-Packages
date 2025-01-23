const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { AdCaptchaAPIClient } = require('@adcaptcha/node');

dotenv.config();
const app = express();
const client = new AdCaptchaAPIClient("86ad2e8c-29e9-4186-b0cf-95a5905ec998");

async function mediaFetchAll() {
  try {
    const result = await client.media.fetchAll();
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function mediaFetchByID() {
  try {
    const result = await client.media.fetchByID("MDA-01JH5TFRZJA6YC7QGA8EBBK02G");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function deleteMedia() {
  try {
    const result = await client.media.deleteMedia("MDA-01JH5TFRZJA6YC7QGA8EBBK02G");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function placementsFetchAll() {
  try {
    const result = await client.placements.fetchAll(1);
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function placementsfetchByID() {
  try {
    const result = await client.placements.fetchByID("PLC-01JH86F5DTFXKRK364G444H05Q");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function createPlacements() {
  try {
    const result = await client.placements.createPlacement( "New Placement", "STE-01J8T6SNY0E41NV9VVD2PQKNF0"
    );
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function sitesFetchAll() {
  try {
    const result = await client.sites.fetchAll();
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

createPlacements();

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
