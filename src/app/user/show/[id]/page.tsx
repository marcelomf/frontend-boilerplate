"use client"

import { ButtonBack } from "@/components/system/backbutton";
import { ApiMA } from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { use, useEffect, useState } from "react";

async function findById(id: string) {
  return await ApiMA.getInstance().findById("user", id);
}

// @ts-ignore
export default function UserEdit({params}) {
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
          <p className="text-muted-foreground">User</p>
        </div>
      </div>
      <Card className="max-w-[800px]">
        <CardContent>
          <Table>
            <TableCaption>A user data</TableCaption>
            <TableBody>
              <TableRow>
                <TableHead className="w-[100px]"><b>Username</b></TableHead>
                <TableCell>{data.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]"><b>Email</b></TableHead>
                <TableCell>{data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]"><b>Roles</b></TableHead>
                <TableCell>{data.roles?.map(o => o.name).join(", ")}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-[100px]"><b>Enabled</b></TableHead>
                <TableCell>{data.is_enable}</TableCell>
              </TableRow>
            </TableBody>  
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={"yellow"}>
            <a href={`/user/edit/${data.id}`}>Edit</a>
          </Button>
          <ButtonBack />
        </CardFooter>
      </Card>
    </>
  )
}

  