import { InvitationSharing } from "@/components/events/invitation-sharing"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function InvitePage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <InvitationSharing id={params.id} />
    </DashboardLayout>
  )
}
