import { cn } from "@/utils/lib/utils";

export const PageLayout = ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className='w-full min-h-[600px] relative flex flex-col overflow-x-hidden overflow-y-auto'>
            <div style={{ minHeight: "calc(100vh - 4rem)" }} className={cn("w-full p-2 sm:p-4 flex flex-col gap-8", className)}>
                {children}
            </div>
        </div>
    )
}