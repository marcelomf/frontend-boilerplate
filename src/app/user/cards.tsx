import { ApiMA, type DataFilter } from "@/api";
import type { DataTableMAControl } from "@/components/datatable";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

const FIX_RESULT_PER_PAGE = 9;

export function UserCards() {

  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dataControl, setDataControl] = useState({page: 1, resultPerPage: FIX_RESULT_PER_PAGE, dataFilter: {}});

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

  const more = async function() {
    dataControl.resultPerPage += FIX_RESULT_PER_PAGE;
    setDataControl(JSON.parse(JSON.stringify(dataControl)));
  }

  const actions = (item: any) => {
    return (
      <div className='flex justify-between w-full'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <a style={{cursor: 'pointer !important'}}><Trash2Icon /></a>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure to remove this user ?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                user and remove your data from our servers.
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
  }

  return (
    <div className="items-center">
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
        {data.map(item => {
          return (
            <Card className="min-w-1/2 m-1" key={item.id}>
              <CardHeader>
                <CardTitle className="text-center"><b>{item.username}</b></CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {item.email}<br />
                {item.roles.map(o => o.name).join(", ")}<br />
                {item.is_enable}
              </CardContent>
              <CardFooter className="w-full">
                {actions(item)}
              </CardFooter>
            </Card>
          )
        })}
      </div>
      <Button style={{cursor: "pointer"}} className="w-full m-1" variant={"default"} onClick={() => {more()}}>More</Button>
    </div>
  );
}