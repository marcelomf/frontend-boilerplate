"use client"

import { RoleSave } from "@/app/role/save";
import { ApiMA } from "@/api";
import { use, useEffect, useState } from "react";

async function findById(id: string) {
  return await ApiMA.getInstance().findById("role", id);
}

// @ts-ignore
export default function RoleEdit({params}) {
  // @ts-ignore
  const { id } = use(params);
  const [data, setData] = useState([]);

  useEffect(() => {
      findById(id).then((data) => setData(data));
  },[]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Edit</h1>
          <p className="text-muted-foreground">Role</p>
        </div>
      </div>
      <div className="max-w-[800px]">
        <RoleSave data={data} />
      </div>
    </>
  )
}