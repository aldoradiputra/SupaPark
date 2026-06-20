// Shared CORS headers for all edge functions. The Raspberry Pi edge binary
// sends X-API-Key; browsers/tools may preflight.
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-api-key, x-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
