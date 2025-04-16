import "@/styles/global.css";
import "@/styles/fonts.css";
import SideBarMA from "@/app/sidebar";
import HeadSEO from "@/components/HeadSEO.astro";
import Footer from "@/components/Footer.astro";
import { Toaster } from "@/components/ui/sonner"

export default function Layout() {

  return (
    <html lang="en">
      <head>
        <HeadSEO title="System" description="System description" />
      </head>
      <body>
        <div class="flex">
          <SideBarMA pathname={Astro.url.pathname}>
            <slot />   
          </SideBarMA>
        </div>
        <Toaster richColors />
        <Footer>
        </Footer>
      </body>
    </html>
  )

}

