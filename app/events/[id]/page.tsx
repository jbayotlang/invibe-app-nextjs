import { EventDetail } from "@/components/events/event-detail"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <EventDetail id={params.id} />
    </DashboardLayout>
  )
}
