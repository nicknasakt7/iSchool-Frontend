export default function FooterContent() {
  return (
    <div className="mt-20 mb-13 px-2 max-w-5xl mx-auto">
      <div className="bg-card rounded-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-shadow duration-300 flex flex-wrap justify-between items-center gap-4 px-10 py-8">
        <div className="flex flex-col items-center hover:scale-105 transition-transform">
          <p className="font-bold text-4xl">150+</p>
          <p className="text-sm text-muted-foreground mt-1">Expert Educators</p>
        </div>
        <div className="flex flex-col items-center hover:scale-105 transition-transform">
          <p className="font-bold text-4xl">2.4k</p>
          <p className="text-sm text-muted-foreground mt-1">Active Students</p>
        </div>
        <div className="flex flex-col items-center hover:scale-105 transition-transform">
          <p className="font-bold text-4xl">98%</p>
          <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
        </div>
        <div className="flex flex-col items-center hover:scale-105 transition-transform">
          <p className="font-bold text-4xl">15+</p>
          <p className="text-sm text-muted-foreground mt-1">Global Labs</p>
        </div>
      </div>
    </div>
  )
}
