export type Verify = {
    statusCode: number;
    message: string;
}

export type SiteStats = {
    totalLiveMedia: number;
    totalPlacement: number;
    last30daysHumanVerifiedCaptchas: SitesStatsData;
  };

export type SiteObject = {
    id: string;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    stats?: SiteStats;
  };

  export type SitesStatsData = {
    name: string;
    data: { value: number }[];
  };

  export type SiteStatsObject = {
    siteStats: SitesStatsData[];
    statusPerDay: SitesStatusPerDayData;
  };

  export type SitesStatusPerDayData = {
    name: string;
    data: {
      date: Date;
      correct: number;
      incorrect: number;
      unanswered: number;
      skipped: number;
      closed: number;
    }[];
  };

  export type MediaObject = {
    id: string;
    name: string;
    type: string;
    keywords: string[];
    sites?: MediaSitesLimitObject[];
    createdAt: Date;
    updatedAt: Date;
    archivedAt: Date;
    scheduleStartAt: Date | null;
    scheduleEndAt: Date | null;
    state: MediaSate;
    metadata: MediaMetaData;
  };

  export type MediaSitesLimitObject = {
    id: string;
    name: string;
  };

  export type MediaSate = 'archived' | 'live' | 'pending';

  export type MediaMetaData = {
    width?: number;
    height?: number;
    duration?: number;
    fps?: number;
    size?: number;
    thumbnailURL?: string;
    playbackURL?: string;
    colourMatrix?: {
      rows: number;
      cols: number;
      colours: { r: number; g: number; b: number }[][];
    };
  };

  export type PlacementObject = {
    id: string;
    name: string;
    siteID: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  
