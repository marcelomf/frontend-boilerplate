import { ApiMA, type DataFilter } from "@/api";
import type { DataTableMAControl } from "@/components/datatable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserActions } from "./actions";
import type { User } from "@/types";

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

  const more = async function() {
    if(dataControl.resultPerPage == totalRecords) return;
    dataControl.resultPerPage += FIX_RESULT_PER_PAGE;
    setDataControl(JSON.parse(JSON.stringify(dataControl)));
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
                <UserActions item={item} remove={remove} />
              </CardFooter>
            </Card>
          )
        })}
      </div>
      <p className="w-full text-center">{dataControl.resultPerPage} of {totalRecords} Record(s)</p>
      <Button style={{cursor: "pointer"}} className="w-full m-1" variant={"default"} onClick={() => {more()}} disabled={(dataControl.resultPerPage == totalRecords)}>More</Button>
    </div>
  );
}