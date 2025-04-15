"use client"

import * as React from "react"
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
import type { Payment } from "@/types/default"

export function UserTable() {

  //console.log(import.meta.env.BASE_URL);

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    },
  ]
  
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          > Status <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("status")}</div>,
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
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          > Amount <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("amount")}</div>,
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
    <DataTableMA data={data} columns={columns}></DataTableMA>
  )
}
