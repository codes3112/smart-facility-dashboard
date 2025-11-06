import { Table as UiTable, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import React, { ReactNode } from "react";

interface Column {
  title: string;
  render: (row: any) => ReactNode;
}

interface AppTableProps {
  data: any[];
  columns: Column[];
}

export default function AppTable({ data, columns }: AppTableProps) {
  return (
    <UiTable>
      <TableHeader>
        <TableRow>
          {columns.map((col, idx) => (
            <TableCell key={idx}>{col.title}</TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex}>{col.render(row)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </UiTable>
  );
}









