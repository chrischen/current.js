import { Suspense } from "react";
import { Outlet } from "react-router-dom"
import DefaultLayout from "../layouts/default"
import '../../global/static.css';

export const Component = () => {
  return <Suspense fallback="Loading"><DefaultLayout><Outlet /></DefaultLayout></Suspense>;
};
