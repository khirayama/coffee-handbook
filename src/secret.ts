export const secret: {
  gaCode: string;
  mapboxToken: string;
} = {
  gaCode: process.env.GOOGLE_ANALYTICS_CODE || '',
  mapboxToken: process.env.MAPBOX_TOKEN || '',
};
