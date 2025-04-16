import { UserSave } from "@/app/user/save";

export default function UserNew() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">New</h1>
          <p className="text-muted-foreground">User</p>
        </div>
      </div>
      <div className="max-w-[800px]">
        <UserSave data={{}} />
      </div>   
    </>
  )
}