const StoryLoadingSkeleton = ({ message }: { message: string }) => (
  <div className="space-y-6">
    {/* Description text */}
    <p className="text-sm text-muted-foreground italic">{message}</p>

    {/* Loading skeleton */}
    <div className="space-y-4 animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 bg-muted rounded-md w-1/2" />
      {/* First paragraph */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded-md w-full" />
        <div className="h-4 bg-muted rounded-md w-4/5" />
        <div className="h-4 bg-muted rounded-md w-3/4" />
      </div>
      {/* Second paragraph */}
      {/* <div className="space-y-2">
        <div className="h-4 bg-muted rounded-md w-full" />
        <div className="h-4 bg-muted rounded-md w-4/5" />
        <div className="h-4 bg-muted rounded-md w-3/4" />
      </div> */}
      {/* Third paragraph */}
      {/* <div className="space-y-2">
        <div className="h-4 bg-muted rounded-md w-5/6" />
        <div className="h-4 bg-muted rounded-md w-full" />
        <div className="h-4 bg-muted rounded-md w-4/6" />
        <div className="h-4 bg-muted rounded-md w-3/4" />
      </div> */}
    </div>
  </div>
);

export default StoryLoadingSkeleton;
