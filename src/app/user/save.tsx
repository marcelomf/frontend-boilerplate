"use client"

import { useForm } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { UserFields } from "./fields"
import { ApiMA } from "@/api"
import { toast } from "sonner"
import { queryParam } from "@/lib/utils"

// @ts-ignore
export function UserSave({data}) {

  const form = useForm();
  const onSubmit = async function() {
    try {
      toast.info("Saving user ...");
      await ApiMA.getInstance().save("user", form.getValues());
      toast.success("Successfuly saved!");
      if(queryParam("forceBack")) history.go(-1);
    } catch(e) {
      console.error(e)
      // @ts-ignore
      toast.error(e?.response?.data?.message || e?.message || String(e));
    }
  }

  return (
    <Form {...form}>
      <UserFields form={form} valueFields={data} callbackSubmit={onSubmit}></UserFields>
    </Form>
  )
}