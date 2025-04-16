"use client"

import { useForm } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { RoleFields } from "./fields"
import { ApiMA } from "@/api"
import { toast } from "sonner"
import { queryParam, urlPath } from "@/lib/utils"
import { useEffect, useState } from "react"
import { navigate } from "astro:transitions/client";

// @ts-ignore
export function RoleSave({data}) {

  const [rerender, setRerender] = useState(true);
  const form = useForm();
  const onSubmit = async function() {
    try {
      toast.info("Saving role ...");
      await ApiMA.getInstance().save("role", form.getValues());
      toast.success("Successfuly saved!");
      if(queryParam("forceBack")) history.go(-1);
      if(urlPath()?.indexOf("/role/new") != -1) navigate("/role/new",{history: "replace"});
    } catch(e) {
      console.error(e)
      // @ts-ignore
      toast.error(e?.response?.data?.message || e?.message || String(e));
    }
  }

  useEffect(() => {
  }, [rerender]);

  return (rerender &&
    <Form {...form}>
      <RoleFields form={form} valueFields={data} callbackSubmit={onSubmit}></RoleFields>
    </Form>
  )
}