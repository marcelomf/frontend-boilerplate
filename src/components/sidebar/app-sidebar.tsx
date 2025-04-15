import * as React from "react"
import { SquareTerminal } from "lucide-react"

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
      title: "Playground",
      url: "#23",
      icon: SquareTerminal,
      items: [
        {
          title: "Logs",
          url: "#321",
          icon: SquareTerminal
        },
        {
          title: "Monitor",
          url: "#123",
          icon: SquareTerminal
        }        
      ]
    },
    {
      title: "Users",
      url: "/security/user",
      icon: SquareTerminal
    },
    {
      title: "Roles",
      url: "/security/role",
      icon: SquareTerminal
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
          <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
              <span>System Logo</span>
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
