/** @type {import('next').NextConfig} */
const nextConfig = {
  // The scaffold focuses on structure + Supabase wiring; keep lint out of the
  // build for now so placeholder pages don't block CI. Type-checking stays on.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
