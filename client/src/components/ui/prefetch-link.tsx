import React from "react";
import { Link, LinkProps } from "wouter";
import { preloadByPath } from "@/lib/preloader";

type PrefetchLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

/**
 * A wrapper for wouter's Link that preloads the target page's JS chunk on hover.
 */
export function PrefetchLink({ children, className, ...props }: PrefetchLinkProps) {
  // Extract target path for preloading (handles both 'href' and 'to' from wouter)
  const targetPath = (props as any).href || (props as any).to;

  const handleMouseEnter = () => {
    if (targetPath) {
      preloadByPath(targetPath);
    }
  };

  return (
    <Link {...props}>
      <a onMouseEnter={handleMouseEnter} className={className}>
        {children}
      </a>
    </Link>
  );
}


export default PrefetchLink;
