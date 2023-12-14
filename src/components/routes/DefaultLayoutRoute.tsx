import { Outlet } from "react-router-dom"
import DefaultLayout from "../layouts/default"

export const Component = () => {
  return <DefaultLayout><Outlet /></DefaultLayout>;
};
