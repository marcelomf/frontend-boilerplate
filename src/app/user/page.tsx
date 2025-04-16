---
export const prerender = false;

import Layout from "@/layouts/Layout.astro";
// import { UserTable } from "@/app/user/table";
import { Button } from "@/components/ui/button";
import { UserCards } from "@/app/user/cards";
---

<Layout>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-primary">Users</h1>
      <p class="text-muted-foreground">Manage users</p>
    </div>
      <Button variant={"blue"}>
        <a href="/user/new">+ Add User</a>
      </Button>
  </div>
  <UserCards client:only />
  <!-- <UserTable client:only /> -->
</Layout>
