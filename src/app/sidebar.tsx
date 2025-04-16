'use client'

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ThemeToggle } from "@/components/system/themetoggle";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode
 }
 
 export default function SideBarMA(props: Props) {

  let location = window.location;
  let canonicalURL = new URL(location.pathname, location.origin);
  useEffect(() => {
      location = window.location;
      canonicalURL = new URL(location.pathname, location.origin); 
  },[]);

  function formatBread(val: string) {
    val = val.replace("/", "");
    val = String(val).charAt(0).toUpperCase() + String(val).slice(1);
    return val;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{formatBread(location?.pathname)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {props.children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )

 }
 