// components/generation/generation-result.tsx
export default function GenerationResult() {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-muted">
        <h4 className="text-lg font-medium">Generating your story...</h4>
        <p className="text-muted-foreground mt-2">
          A beautiful sunset over the mountains, with warm orange and purple
          hues...
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
