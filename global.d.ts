import { AgGridReactProps } from "ag-grid-react";

declare module "ag-grid-react" {
  interface AgGridReactProps<TData = any> {
    immutableData?: boolean;
  }
}
