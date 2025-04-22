import { ImmersiveEventPreview } from "@/components/events/immersive-event-preview"

export default function EventPreviewPage({ params }: { params: { id: string } }) {
  return <ImmersiveEventPreview id={params.id} />
}
