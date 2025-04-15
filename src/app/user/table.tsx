"use client"

import { useEffect, useState } from 'react';
import {
  type ColumnDef,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DataTableMA, type DataTableMAControl } from "@/components/datatable"
import type { User } from "@/types"
import { ApiMA, type DataFilter } from "@/api"
import { Trash2Icon } from "lucide-react"
import { toast } from "sonner"

const findFilter = async (dataControl: DataTableMAControl) => {
  let dataFilter: DataFilter = {
    skip: (dataControl.page == 1) ? 0 : dataControl.page * dataControl.resultPerPage,
    take: dataControl.resultPerPage,
  }
  if(dataControl.dataFilter.include) dataFilter.include = dataControl.dataFilter.include;
  if(dataControl.dataFilter.where) dataFilter.where = dataControl.dataFilter.where;
  if(dataControl.dataFilter.orderBy) dataFilter.orderBy = dataControl.dataFilter.orderBy;
  return await ApiMA.getInstance().findFilter("user", dataFilter);
}

const count = async () => {
  return await ApiMA.getInstance().count("user");
}

export function UserTable() {

  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dataControl, setDataControl] = useState({page: 1, resultPerPage: 10, dataFilter: {}});

  useEffect(() => {
    findFilter(dataControl).then((responseFilter) => {
      count().then(totalRecords => {
        
        setTotalRecords(totalRecords);
        setData(responseFilter);
      });
    });
  }, [dataControl]);
  
  const remove = async function(item: any) {
    try {
      toast.info("Removing user ...");
      await ApiMA.getInstance().remove("user", item.id);
      toast.success("Successfuly removed!");
      setData(await findFilter(dataControl));
      setTotalRecords(await count());
    } catch(e) {
      console.error(e);
      // @ts-ignore
      toast.error(e?.response?.data?.message || e?.message || String(e));
    }
    return undefined;
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          > Username <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("username")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          > Email <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "locale",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          > Locale <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("locale")}</div>,
    },
    {
      accessorKey: "roles",
      header: ({ column }) => {
        return (
          <span> Roles </span>
        )
      }, // @ts-ignore
      cell: ({ row }) => <div>{row.getValue("roles")?.map(o => o.name).join(", ")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original
  
        return (
          <div className='flex'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <a style={{cursor: 'pointer !important'}}><Trash2Icon /></a>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure to remove this item ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    item and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel style={{cursor: 'pointer !important'}}>Cancel</AlertDialogCancel>
                  <AlertDialogAction style={{cursor: 'pointer !important'}} onClick={() => { remove(item) }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" style={{cursor: 'pointer !important'}}>
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem style={{cursor: '!important'}}
                  onClick={() => navigator.clipboard.writeText(item.id)}
                > Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <a href={`/user/show/${item.id}`}><DropdownMenuItem style={{cursor: 'pointer !important'}}>Show</DropdownMenuItem></a>
                <a href={`/user/edit/${item.id}`}><DropdownMenuItem style={{cursor: 'pointer !important'}}>Edit</DropdownMenuItem></a>         
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        )
      },
    },
  ]

  return (
      <DataTableMA setDataControl={setDataControl} dataControl={dataControl} data={data} columns={columns} totalRecords={totalRecords}></DataTableMA>
  )
}
