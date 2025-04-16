"use client"

import { useEffect, useState } from 'react';
import {
  type ColumnDef,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTableMA, type DataTableMAControl } from "@/components/datatable"
import type { User } from "@/types"
import { ApiMA, type DataFilter } from "@/api"
import { toast } from "sonner"
import { UserActions } from './actions';

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
  
  const remove = async function(item: User) {
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
      accessorKey: "is_enable",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          > Enabled <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("is_enable")}</div>,
    },
    {
      accessorKey: "roles",
      header: ({ column }) => {
        return (<span> Roles </span>)
      }, // @ts-ignore
      cell: ({ row }) => <div>{row.getValue("roles")?.map(o => o.name).join(", ")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: ({column}) => {
        return (<div className='flex w-full items-center justify-center'><span> Actions </span></div>)
      },
      cell: ({ row }) => {
        const item = row.original
        return (
          <UserActions item={item} remove={remove} />
        )
      },
    },
  ]

  return (
      <DataTableMA setDataControl={setDataControl} dataControl={dataControl} data={data} columns={columns} totalRecords={totalRecords}></DataTableMA>
  )
}
