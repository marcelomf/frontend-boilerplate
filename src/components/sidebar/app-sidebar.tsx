import * as React from "react"
import { Users, ShieldUser, LayoutDashboard } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Users",
      url: "/user",
      icon: Users
    },
    {
      title: "Roles",
      url: "/role",
      icon: ShieldUser
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
          <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
              <span>System</span>
            </SidebarHeader>
            <SidebarContent>
              <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
              <NavUser user={data.user} />
            </SidebarFooter>
          </Sidebar>
    )
}
