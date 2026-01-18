import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative flex w-10", className)}>
      <div className="relative aspect-square w-1/2 rounded-br-full border-2 border-l-0 border-black dark:border-white"></div>
      <div className="aspect-square w-1/2 -translate-x-[50%] rounded-r-full border-2 border-blue-600"></div>
    </div>
  );
};

export default Logo;
