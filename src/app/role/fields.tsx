"use client"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/system/multi-select"
import { ApiMA } from "@/api"
import { Suspense, use } from "react"
import { ButtonBack } from "@/components/system/backbutton"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox } from "@/components/ui/combobox"

const findAll = async (moduleName: string) => {
  return await ApiMA.getInstance().findAll(moduleName);
};

const dataUserPromise = findAll("user");
const dataRolePromise = findAll("role");

// @ts-ignore
export function RoleFields({form, valueFields, callbackSubmit}) {

  const dataUser = use(dataUserPromise);
  const dataRole = use(dataRolePromise);
  let selectedDataUser: string[] | undefined = [];

  if(valueFields && valueFields.id) {
    // @ts-ignore
    selectedDataUser = dataUser.filter(o => valueFields.users.map(o2 => o2.id).includes(o.id)).map(o => {return o.id});
    for(let field in valueFields) {
      if(field == "roles") continue;
      if(field == "users") continue;
      form.setValue(field, valueFields[field]);
    }
  }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
        <form onSubmit={form.handleSubmit((callbackSubmit))} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="users"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Users</FormLabel>
                <FormControl>
                  <MultiSelect
                    {...field} 
                    // @ts-ignore
                    options={dataUser.map(d => {return {value: d.id, label: d.username}})}
                    onValueChange={field.onChange}
                    defaultValue={selectedDataUser}
                    placeholder="Select users"
                    variant="inverted"
                    animation={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="top_role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Top Role</FormLabel>
                <FormControl>
                  <Combobox 
                    data={dataRole.map(d => {return {value: d.id, label: d.name}})}
                    setValue={field.onChange}
                    value={field.value}
                    selectPlaceholder="Select top role" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="submit">Save</Button>
            <ButtonBack />
          </div>
        </form>
    </Suspense>
  )
}
