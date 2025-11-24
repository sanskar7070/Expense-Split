"use client"

import Link from "next/link"
import type { ActivityItem } from "@/lib/types"

interface ActivityItemProps {
  activity: ActivityItem
}

export function ActivityItemComponent({ activity }: ActivityItemProps) {
  const date = new Date(activity.timestamp)
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <Link href={`/group/${activity.groupId}`}>
      <div className="flex items-center justify-between p-4 border-b border-border hover:bg-muted transition-colors cursor-pointer">
        <div className="flex-1">
          <p className="font-medium text-foreground">{activity.description}</p>
          <p className="text-sm text-muted-foreground">{activity.groupName}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
          <span className="font-semibold text-foreground">${activity.amount.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  )
}
