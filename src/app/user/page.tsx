import { Button } from "@/components/ui/button";
// import { UserTable } from "@/app/user/table";
import { UserCards } from "@/app/user/cards";

export default function UserPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Users</h1>
          <p className="text-muted-foreground">Manage users</p>
        </div>
        <Button variant="blue">
          <a href="/user/new">+ Add User</a>
        </Button>
      </div>
      <UserCards />
      { 
      // <UserTable />
      }
    </>
  )
}
