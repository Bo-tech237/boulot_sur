"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/dataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { ApplicationDataType } from "@/types/applications";
import { StarRating } from "@/components/StarRating";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<ApplicationDataType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return <div className="font-medium uppercase">{status}</div>;
    },
  },
  {
    accessorKey: "recruiter.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recruiter" />
    ),
  },
  {
    accessorKey: "job.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job" />
    ),
    cell: ({ row }) => {
      const title: string = row.getValue("job_title");

      return <div className="font-medium uppercase">{title}</div>;
    },
  },
  {
    accessorKey: "recruiter.rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recruiter's Rating" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <StarRating
            value={row.getValue("recruiter_rating")}
            readOnly
            maxStars={5}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
