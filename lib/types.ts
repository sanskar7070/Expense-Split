export interface Member {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  groupId: string
  date: string
  splits: {
    memberId: string
    amount: number
  }[]
}

export interface Group {
  id: string
  name: string
  description?: string
  members: Member[]
  expenses: Expense[]
  createdAt: string
}

export interface Balance {
  memberId: string
  amount: number
}

export interface ActivityItem {
  id: string
  type: "payment" | "expense"
  description: string
  amount: number
  timestamp: string
  groupName: string
  groupId: string
}

export interface DashboardData {
  totalBalance: number
  youOwe: number
  youAreOwed: number
  groups: Group[]
  recentActivity: ActivityItem[]
}
