"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/dataTableColumnHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { formatMoney } from "@/lib/friendly-time";
import { truncateAtLastSpace } from "@/lib/truncateText";
import { Doc } from "../../../../../convex/_generated/dataModel";
import DeleteJobsDialog from "@/components/DeleteJobsDialog";
import { StarRating } from "@/components/StarRating";
import { useState } from "react";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Doc<"jobs">>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const title: string = row.getValue("title");

      return <div className="font-medium uppercase">{title}</div>;
    },
  },
  {
    accessorKey: "maxApplicants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Applicants" />
    ),
  },
  {
    accessorKey: "maxPositions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Positions" />
    ),
  },
  {
    accessorKey: "skillsets",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skillsets" />
    ),
    cell: ({ row }) => {
      const skillsets: any[] = row.getValue("skillsets");

      const formatted = skillsets.map((skillset) => `${skillset.text} `);

      return <div className="font-medium capitalize">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description: string = row.getValue("description");

      const formatted = truncateAtLastSpace(description, 16);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Type" />
    ),
  },
  {
    accessorKey: "salary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary" />
    ),
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));
      const formatted = formatMoney(salary);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "activeApplications",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active Applications" />
    ),
  },
  {
    accessorKey: "acceptedApplicants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Accepted Applicants" />
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <StarRating value={row.getValue("rating")} readOnly maxStars={5} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
