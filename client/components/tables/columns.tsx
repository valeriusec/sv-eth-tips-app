import { ColumnDef } from "@tanstack/react-table";

export type TipTransaction = {
  name: string;
  message: string;
  from: string;
  timestamp: number;
};

export const columns: ColumnDef<TipTransaction>[] = [
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp");
      const date = new Date(Number(timestamp as number) * 1000);
      const options: any = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = date.toLocaleString(undefined, options); // Format the date and time as a string
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "from",
    header: "From Address",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
        const tx = row.original;
        return <div className="w-[250px] min-w-[250px]">{row.original.message}</div>
    }
  },
];
