import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function queryParam(paramName: string) {
  if(!window.location.search) return undefined;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params[paramName];
}

export function urlPath() {
  if (typeof window !== "undefined") {
    return window.location.pathname;
  }
  return "";
}