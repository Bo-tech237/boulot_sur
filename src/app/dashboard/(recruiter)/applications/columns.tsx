"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/dataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Download } from "lucide-react";
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
    accessorKey: "applicant.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant" />
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
    accessorKey: "applicant.fileUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resume" />
    ),
    cell: ({ row }) => {
      const pdfUrl: string = row.getValue("applicant_fileUrl");

      return (
        <Button>
          <Link
            href={pdfUrl}
            locale={false}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Download Resume"
            className="flex items-center gap-2"
          >
            <Download /> <span className="text-xl">PDF</span>
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "applicant.rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant's Rating" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <StarRating
            value={row.getValue("applicant_rating")}
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
