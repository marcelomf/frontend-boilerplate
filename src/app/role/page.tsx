import { Button } from "@/components/ui/button";
import { RoleTable } from "@/app/role/table";
//import { RoleCards } from "@/app/role/cards";

export default function RolePage() {
  return (
    <>
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Roles</h1>
        <p className="text-muted-foreground">Manage roles</p>
      </div>
      <Button variant={"blue"}>
        <a href="/role/new">+ Add Role</a>
      </Button>
    </div>
    <RoleTable />
    { 
      // <RoleCards />
    }
    </>
  )
}
