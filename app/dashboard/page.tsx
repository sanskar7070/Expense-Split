"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BalanceSummary } from "@/components/balance-summary"
import { GroupCard } from "@/components/group-card"
import { ActivityItemComponent } from "@/components/activity-item"
import { getMockDashboardData } from "@/lib/mock-data"

export default function DashboardPage() {
  const data = getMockDashboardData()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your expenses and groups in one place</p>
          </div>

          {/* Balance Summary */}
          <div className="mb-12">
            <BalanceSummary youOwe={data.youOwe} youAreOwed={data.youAreOwed} totalBalance={data.totalBalance} />
          </div>

          {/* Groups Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Your Groups</h2>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Create Group
              </button>
            </div>

            {data.groups.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-muted-foreground mb-4">No groups yet</p>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Create Your First Group
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.groups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {data.recentActivity.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No recent activity</div>
              ) : (
                <div className="divide-y divide-border">
                  {data.recentActivity.map((activity) => (
                    <ActivityItemComponent key={activity.id} activity={activity} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
