const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { AdCaptchaAPIClient } = require('@adcaptcha/node');

dotenv.config();
const app = express();
const client = new AdCaptchaAPIClient("c17832c7-c088-417d-b652-6378650965ec");

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
    const result = await client.placements.createPlacement( "Second Placement", "STE-01JHTK6HM50CVN2Q0BJRZT0Z3S"
    );
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

//  example for sites API
async function sitesFetchAll() {
  try {
    const result = await client.sites.fetchAll();
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function sitesFetchByID() {
  try {
    const result = await client.sites.fetchByID("STE-01JHTK6HM50CVN2Q0BJRZT0Z3S");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function sitesFetchStatsForSite() {
  try {
    const result = await client.sites.fetchStatsForSite("STE-01JHTK6HM50CVN2Q0BJRZT0Z3S", 2);
    console.log(result.data.statusPerDay); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function sitesCreateSite() {
  try {
    const result = await client.sites.createSite("Terency Hill", "https://piedone.com");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function sitesUpdateSite() {
  try {
    const result = await client.sites.updateSite("STE-01JJ9GGYG0462TE9E2NR6ACED1", "Terency Hill updated", "https://piedone.com");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}


async function sitesDeleteSite() {
  try {
    const result = await client.sites.deleteSite("STE-01JJ9GGYG0462TE9E2NR6ACED1");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}



sitesDeleteSite();

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
