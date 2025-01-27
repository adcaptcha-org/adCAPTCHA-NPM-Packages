import axios from "axios";

enum MediaType {
    Video = 'video',
    Image = 'image',
  }

export function determineMediaType(mimeType: string): MediaType | null {
    const supportedTypes: Record<string, MediaType> = {
      'video/mp4': MediaType.Video,
      'video/quicktime': MediaType.Video,
      'video/x-msvideo': MediaType.Video,
      'video/webm': MediaType.Video,
      'image/png': MediaType.Image,
      'image/jpeg': MediaType.Image,
      'image/avif': MediaType.Image,
      'image/webp': MediaType.Image,
      'image/jpg': MediaType.Image,
      'image/heic': MediaType.Image,
    };
    return supportedTypes[mimeType] || null;
  }

  export async function uploadFileToS3(
    signedURL: string,
    mediaFile: File,
  ): Promise<boolean> {
    try {
      await axios.put(signedURL, mediaFile, {
        headers: {
          'Content-Type': mediaFile.type,
        },
      });
  
      return true;
    } catch (error) {
      console.error(`Error uploading file: ${error}`);
      return false;
    }
  }