import Link from "next/link";
import { cn } from "~/lib/utils";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  storeId: string;
}

export function MainNav({ className, storeId, ...props }: MainNavProps) {
  return (
    <nav
      className={cn(
        "hidden items-center space-x-4 md:flex lg:space-x-6",
        className
      )}
      {...props}
    >
      <Link
        href={`/stores/${storeId}`}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href={`/stores/${storeId}/settings`}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
