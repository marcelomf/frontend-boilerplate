import { RoleSave } from "@/app/role/save";

export default function RoleNew() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">New</h1>
          <p className="text-muted-foreground">Role</p>
        </div>
      </div>
      <div className="max-w-[800px]">
        <RoleSave data={{}} />
      </div>
    </>
  )
}