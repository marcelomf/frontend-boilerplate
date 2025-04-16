"use client"

import { ButtonBack } from "@/components/system/backbutton";
import { ApiMA } from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { use, useEffect, useState } from "react";

async function findById(id: string) {
  return await ApiMA.getInstance().findById("role", id);
}

// @ts-ignore
export default function RoleShow({params}) {
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
          <h1 className="text-3xl font-bold tracking-tight text-primary">Show</h1>
          <p className="text-muted-foreground">Role</p>
        </div>
      </div>
      <Card className="max-w-[800px]">
        <CardContent>
          <Table>
            <TableCaption>A role data</TableCaption>
            <TableBody>
              <TableRow>
                <TableHead className="w-[100px]"><b>Name</b></TableHead>
                <TableCell>{data.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]"><b>Code</b></TableHead>
                <TableCell>{data.code}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]"><b>Users</b></TableHead>
                <TableCell>{data.users?.map(o => o.username).join(", ")}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]"><b>Top Role</b></TableHead>
                <TableCell>{data.top_role?.name}</TableCell>
              </TableRow>
            </TableBody>  
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={"yellow"}>
            <a href={`/role/edit/${data.id}`}>Edit</a>
          </Button>
          <ButtonBack />
        </CardFooter>
      </Card>
    </>
  )
}