import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2Icon } from "lucide-react"

// @ts-ignore
export function RoleActions({item, remove}) {
  return (
    <div className='flex justify-between w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" style={{cursor: 'pointer !important'}}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem style={{cursor: 'pointer !important'}}
            onClick={() => navigator.clipboard.writeText(item.id)}
          > Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <a href={`/role/show/${item.id}`}><DropdownMenuItem style={{cursor: 'pointer !important'}}>Show</DropdownMenuItem></a>
          <a href={`/role/edit/${item.id}`}><DropdownMenuItem style={{cursor: 'pointer !important'}}>Edit</DropdownMenuItem></a>         
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <a style={{cursor: 'pointer !important'}}><Trash2Icon /></a>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure to remove this role ?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              role and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{cursor: 'pointer !important'}}>Cancel</AlertDialogCancel>
            <AlertDialogAction style={{cursor: 'pointer !important'}} onClick={() => { remove(item) }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}