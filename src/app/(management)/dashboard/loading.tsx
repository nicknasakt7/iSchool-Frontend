export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* TITLE */}
      <div className="space-y-2">
        <div className="h-8 w-80 bg-muted rounded" />
        <div className="h-4 w-96 bg-muted rounded" />
      </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <div className="bg-muted rounded-2xl p-6 space-y-6">
          {/* icon */}
          <div className="w-12 h-12 rounded-xl bg-muted-foreground/20" />

          {/* title + number */}
          <div className="space-y-2">
            <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
            <div className="h-10 w-40 bg-muted-foreground/20 rounded" />
          </div>

          {/* divider */}
          <div className="h-px bg-muted-foreground/10" />

          {/* grade grid */}
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-full bg-muted-foreground/10"
              />
            ))}
          </div>
        </div>

        {/* ALERT CARD */}
        <div className="lg:col-span-2 bg-muted rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-4 w-40 bg-muted-foreground/20 rounded" />
            <div className="h-8 w-72 bg-muted-foreground/20 rounded" />
            <div className="h-4 w-full bg-muted-foreground/10 rounded" />
            <div className="h-4 w-2/3 bg-muted-foreground/10 rounded" />

            {/* button */}
            <div className="h-10 w-56 bg-muted-foreground/20 rounded-full mt-4" />
          </div>

          {/* right box */}
          <div className="self-end mt-6 h-24 w-32 bg-muted-foreground/20 rounded-xl" />
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* present */}
        <div className="bg-muted rounded-2xl p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-muted-foreground/20" />
          <div className="space-y-2">
            <div className="h-4 w-40 bg-muted-foreground/20 rounded" />
            <div className="h-8 w-32 bg-muted-foreground/20 rounded" />
          </div>
        </div>

        {/* absent */}
        <div className="bg-muted rounded-2xl p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-muted-foreground/20" />
          <div className="space-y-2">
            <div className="h-4 w-40 bg-muted-foreground/20 rounded" />
            <div className="h-8 w-32 bg-muted-foreground/20 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
