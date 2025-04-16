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

const findAll = async (moduleName: string) => {
  return await ApiMA.getInstance().findAll(moduleName);
};

const dataRolePromise = findAll("role");

// @ts-ignore
export function UserFields({form, valueFields, callbackSubmit}) {

  const dataRole = use(dataRolePromise);
  let selectedDataRole: string[] | undefined = [];

  if(valueFields && valueFields.id) {
    // @ts-ignore
    selectedDataRole = dataRole.filter(o => valueFields.roles.map(o2 => o2.id).includes(o.id)).map(o => {return o.id});
    for(let field in valueFields) {
      if(field == "roles") continue;
      form.setValue(field, valueFields[field]);
    }
  }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
        <form onSubmit={form.handleSubmit((callbackSubmit))} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_enable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enabled</FormLabel>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roles</FormLabel>
                <FormControl>
                  <MultiSelect
                    {...field} 
                    // @ts-ignore
                    options={dataRole.map(d => {return {value: d.id, label: d.name}})}
                    onValueChange={field.onChange}
                    defaultValue={selectedDataRole}
                    placeholder="Select roles"
                    variant="inverted"
                    animation={2}
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
