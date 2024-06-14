"use client";
import dynamic from "next/dynamic";

const Component = dynamic(() => import("./tableWithEditorCells"), {
  ssr: false,
});

// WOW, we need to use proxy with 'use client' in the file
// because next.js is fucked
// it threw errors like a bitch about "window is undefined" and ignored "use client"
// in tableWithEditorCells component
export const TableWithEditorCells = () => {
  return <Component />;
};
