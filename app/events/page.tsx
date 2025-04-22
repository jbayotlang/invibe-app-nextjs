import { EventList } from "@/components/events/event-list"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function EventsPage() {
  return (
    <DashboardLayout>
      <EventList />
    </DashboardLayout>
  )
}
