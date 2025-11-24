"use client"

interface BalanceSummaryProps {
  youOwe: number
  youAreOwed: number
  totalBalance: number
}

export function BalanceSummary({ youOwe, youAreOwed, totalBalance }: BalanceSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-lg p-6">
        <p className="text-sm font-medium text-muted-foreground mb-2">Total Balance</p>
        <div className={`text-3xl font-bold ${totalBalance >= 0 ? "text-success" : "text-destructive"}`}>
          {totalBalance >= 0 ? "+" : ""} ${Math.abs(totalBalance).toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{totalBalance >= 0 ? "People owe you" : "You owe people"}</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <p className="text-sm font-medium text-muted-foreground mb-2">You Owe</p>
        <div className="text-3xl font-bold text-destructive">${youOwe.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground mt-1">To settle up</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <p className="text-sm font-medium text-muted-foreground mb-2">You Are Owed</p>
        <div className="text-3xl font-bold text-success">${youAreOwed.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground mt-1">People owe you</p>
      </div>
    </div>
  )
}
