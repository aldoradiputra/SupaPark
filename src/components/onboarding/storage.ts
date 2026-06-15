// Step-1 data is stashed in sessionStorage so step 2 can prefill without
// reading the leads table (anon has no SELECT on leads).
export function onboardingStorageKey(id: string): string {
  return `supapark:onboarding:${id}`;
}

export interface OnboardingDraft {
  facilityName?: string;
}
