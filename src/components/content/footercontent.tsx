export default function FooterContent() {
  return (
    <div className="mt-20 mb-13 px-0 lg:px-20">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-col items-center hover:scale-105">
          <p className="font-bold text-2xl">150+</p>
          <p className="text-[10px] text-gray-400">Expert Educators</p>
        </div>
        <div className="flex flex-col items-center hover:scale-105">
          <p className="font-bold text-2xl">2.4k</p>
          <p className="text-[10px] text-gray-400">Active Students</p>
        </div>
        <div className="flex flex-col items-center hover:scale-105">
          <p className="font-bold text-2xl">98%</p>
          <p className="text-[10px] text-gray-400">Success Rate</p>
        </div>
        <div className="flex flex-col items-center hover:scale-105">
          <p className="font-bold text-2xl">15+</p>
          <p className="text-[10px] text-gray-400">Global Labs</p>
        </div>
      </div>
    </div>
  )
}