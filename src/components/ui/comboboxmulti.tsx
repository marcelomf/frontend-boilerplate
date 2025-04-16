"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export function ComboboxMulti({ data, values, selectPlaceholder, setValues }) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  // Function to handle selection/deselection
  const handleSelect = (currentValue: string) => {
    if (values.includes(currentValue)) {
      // If already selected, remove it
      setValues(values.filter((value) => value !== currentValue))
    } else {
      // If not selected, add it
      setValues([...values, currentValue])
    }
  }

  // Function to remove a selected item
  const removeValue = (valueToRemove: string, e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setValues(values.filter((value) => value !== valueToRemove))
  }

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            onClick={() => setOpen(!open)}
          >
            <div className="flex flex-wrap gap-1 items-center max-w-[90%] overflow-hidden">
              {values.length > 0 ? (
                <div className="flex flex-wrap gap-1 items-center">
                  {values.map((value) => {
                    const item = data.find((f) => f.value === value)
                    return (
                      <Badge key={value} variant="secondary" className="mr-1">
                        {item?.label}
                        <button
                          className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-1"
                          onMouseDown={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                          onClick={(e) => removeValue(value, e)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              ) : (
                selectPlaceholder
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search item..." value={inputValue} onValueChange={setInputValue} />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem key={item.value} value={item.value} onSelect={handleSelect}>
                    <div className="flex items-center">
                      <Check
                        className={cn("mr-2 h-4 w-4", values.includes(item.value) ? "opacity-100" : "opacity-0")}
                      />
                      {item.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}