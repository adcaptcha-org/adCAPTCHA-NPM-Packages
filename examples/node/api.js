const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path = require('path');
const { AdCaptchaAPIClient } = require('@adcaptcha/node');

dotenv.config();
const app = express();
const client = new AdCaptchaAPIClient("c17832c7-c088-417d-b652-6378650965ec");

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

// example for Verify API

async function verifyVerifyToken() {
  try {
    const result = await client.verify.verifyToken("InvalidToken");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

// example for Media API

async function mediaQuery() {
  try {
    const filters = {
      status: 'live',  
      siteID: "STE-01JHT1EPZ83KVZM3XZCH1YA6HD",
    };

    const result = await client.media.query(filters, 1);
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function mediaFetchAll() {
  try {
    const result = await client.media.fetchAll();
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function mediaFetchAllArchived() {
  try {
    const result = await client.media.fetchAllArchived();
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function mediaFetchByID() {
  try {
    const result = await client.media.fetchByID("MDA-01JJ9AH5A2EH4QW728QKS92J25");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function createFileFromAsset(assetPath) {
  const fullPath = path.resolve(assetPath);
  const fileBuffer = await fs.readFile(fullPath);
  const parsedPath = path.parse(assetPath);
  const fileName = parsedPath.name.charAt(0).toUpperCase() + parsedPath.name.slice(1);
  const mimeType = 'image/webp'; 
  return new File([fileBuffer], fileName, { type: mimeType });
}
async function mediaCreateMediaFromAsset() {
  try {
    const mediaFile = await createFileFromAsset('./assets/piedone.webp');
    const result = await client.media.createMedia(
      mediaFile,
      ['STE-01JHT1EPZ83KVZM3XZCH1YA6HD'], 
      ['Suti', 'Sima'], 
      new Date('2025-01-01T00:00:00Z'), 
      new Date('2025-12-31T23:59:59Z') 
    );
    console.log('Media created successfully:', result.data);
  } catch (error) {
    console.error('Error creating media:', error);
  }
}

async function mediaUnarchiveMedia() {
  try {
    const result = await client.media.unarchiveMedia(
      "MDA-01JJ9A52251ARBEYGXGV8E8G7V" );

    console.log("Media updated successfully:", result.data);
  } catch (error) {
    console.error("Error updating media:", error);
  }
}
mediaUnarchiveMedia();
async function mediaUpdateMedia() {
  try {
    const result = await client.media.updateMedia(
      "MDA-01JJBV4XASVQE47BN6NDEZGTPC", 
      "Minimal Media Update", 
      "CUS-123", 
      ["STE-01JHT1EPZ83KVZM3XZCH1YA6HD"], 
      [], 
      null, 
      null 
    );

    console.log("Media updated successfully:", result.data);
  } catch (error) {
    console.error("Error updating media:", error);
  }
}

async function deleteMedia() {
  try {
    const result = await client.media.deleteMedia("MDA-01JJ9AH5A2EH4QW728QKS92J25");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

// example for Placements API

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
    const result = await client.placements.fetchByID("PLC-01JJ1FWT6M7TQC7HNFYZQ8SAPM");
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

// example for site/id/Placements API
async function siteFetchAllPlacements() {
  try {
    const result = await client.sitePlacements.fetchAll("STE-01JHT1EPZ83KVZM3XZCH1YA6HD", 1);
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function createPlacement() {
  try {
    const result = await client.sitePlacements.createPlacement( "Terrency Placement", "STE-01JJ9GBGDEJVG640AYCABA3YH4"
    );
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function updatePlacement() {
  try {
    const result = await client.sitePlacements.updatePlacement( "PLC-01JJ1FWT6M7TQC7HNFYZQ8SAPM", "Terrency Hill Placement", "STE-01JJ9GBGDEJVG640AYCABA3YH4"
    );
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}

async function deletePlacement() {
  try {
    const result = await client.sitePlacements.deletePlacement( "PLC-01JJ1FWT6M7TQC7HNFYZQ8SAPM", "STE-01JJ9GBGDEJVG640AYCABA3YH4"
    );
    console.log(result.data); 
  } catch (error) {
    console.error("Error fetching sites:", error);
  }
}



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
