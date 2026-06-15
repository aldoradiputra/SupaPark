import { PagePlaceholder } from "@/components/placeholder";

export default function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <PagePlaceholder
      title="Lead detail"
      description={`Lead ${params.id}`}
    />
  );
}
