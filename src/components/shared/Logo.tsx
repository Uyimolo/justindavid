import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative flex w-10", className)}>
      <div className="relative w-1/2 border-2 border-l-0 rounded-br-full border-black dark:border-white aspect-square">
        
      </div>
      <div className="aspect-square w-1/2 border-2 rounded-r-full -translate-x-[50%] border-blue-600"></div>
    </div>
  );
};

export default Logo;
