import { ReactNode } from "react";

interface MasonryGridProps {
  children: ReactNode;
}

const MasonryGrid = ({ children }: MasonryGridProps) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 px-4 md:px-8">
      {children}
    </div>
  );
};

export default MasonryGrid;
