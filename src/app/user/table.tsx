"use client"

import React, { Suspense, use, useEffect } from 'react';
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
import { DataTableMA } from "@/components/datatable"
import type { User } from "@/types"
import { ApiMA } from "@/api"

const findAll = async () => {
  return await ApiMA.getInstance().findAll("user");
};

const dataUsePromise = findAll();

export function UserTable() {

  const data = use(dataUsePromise);
  
  useEffect(() => {
    console.log('oi');
  }, []);

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
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          > Roles <ArrowUpDown />
          </Button>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" style={{cursor: 'pointer'}}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem style={{cursor: 'pointer'}}
                onClick={() => navigator.clipboard.writeText(item.id)}
              > Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <a href={`/user/show/${item.id}`}><DropdownMenuItem style={{cursor: 'pointer'}}>Show</DropdownMenuItem></a>
              <a href={`/user/edit/${item.id}`}><DropdownMenuItem style={{cursor: 'pointer'}}>Edit</DropdownMenuItem></a>
              <DropdownMenuItem style={{cursor: 'pointer'}}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Remove</Button>
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
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <DataTableMA data={data} columns={columns}></DataTableMA>
    </Suspense>

  )
}
