import { PagePlaceholder } from "@/components/placeholder";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <PagePlaceholder
      title="Project detail"
      description={`Project ${params.id}`}
    />
  );
}
