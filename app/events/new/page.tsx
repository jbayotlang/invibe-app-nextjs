import { EventCreationForm } from "@/components/events/event-creation-form"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function CreateEventPage() {
  return (
    <DashboardLayout>
      <EventCreationForm />
    </DashboardLayout>
  )
}
