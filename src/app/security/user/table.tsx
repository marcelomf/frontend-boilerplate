"use client"

import React, { Suspense, use } from 'react';
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
import { DataTableMA } from "@/components/datatable"
import type { User } from "@/types"
import { ApiMA } from "@/api"

const findAll = async () => {
  return await ApiMA.getInstance().findAll("user");
};

const userPromise = findAll();

export function UserTable() {

  const data = use(userPromise);
  
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
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original
  
        return (
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
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
              <DropdownMenuItem style={{cursor: 'pointer'}}>Show</DropdownMenuItem>
              <DropdownMenuItem style={{cursor: 'pointer'}}>Edit</DropdownMenuItem>
              <DropdownMenuItem style={{cursor: 'pointer'}}>Remove</DropdownMenuItem>
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
