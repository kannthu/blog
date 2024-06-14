"use client";
import dynamic from "next/dynamic";
import type { CustomDSLInputProps } from "./complexCodeEditor";

const Component = dynamic(() => import("./complexCodeEditor"), {
  ssr: false,
});

// WOW, we need to use proxy with 'use client' in the file
// because next.js is fucked
// it threw errors like a bitch about "window is undefined" and ignored "use client"
// in complexCodeEditor component
export const CustomDSLInput = (props: CustomDSLInputProps) => {
  return <Component {...props} />;
};
