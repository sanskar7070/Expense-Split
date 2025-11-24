"use client"

import Link from "next/link"
import type { Group } from "@/lib/types"
import { calculateBalances } from "@/lib/mock-data"

interface GroupCardProps {
  group: Group
}

export function GroupCard({ group }: GroupCardProps) {
  const balances = calculateBalances(group)
  const userBalance = balances.find((b) => b.memberId === "user1")?.balance || 0

  return (
    <Link href={`/group/${group.id}`}>
      <div className="bg-card border border-border rounded-lg p-5 hover:shadow-md hover:border-primary transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{group.name}</h3>
            <p className="text-xs text-muted-foreground">{group.members.length} members</p>
          </div>
          <div
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              userBalance >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}
          >
            {userBalance >= 0 ? "+" : ""} ${Math.abs(userBalance).toFixed(2)}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          {group.members.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
              title={member.name}
            >
              {member.name.charAt(0)}
            </div>
          ))}
          {group.members.length > 3 && (
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-semibold text-muted-foreground flex-shrink-0">
              +{group.members.length - 3}
            </div>
          )}
        </div>

        {group.description && <p className="text-xs text-muted-foreground mt-3">{group.description}</p>}
      </div>
    </Link>
  )
}
