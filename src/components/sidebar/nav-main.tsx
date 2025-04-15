"use client"
import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={true}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {!item.items ?
              <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <a href={item.url}>
                  <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
              :
              <><CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    {!item.items ?
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
                      :
                      <span>{item.title}</span>}
                  </SidebarMenuButton>
                </CollapsibleTrigger><CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuSubButton>
                              {subItem.icon && <item.icon />}
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </CollapsibleTrigger>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent></>  
              }
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
