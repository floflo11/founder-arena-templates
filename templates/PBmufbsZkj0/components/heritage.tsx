export function Heritage() {
  return (
    <section id="heritage" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase mb-4 font-light opacity-90">
              Est. 2025 • Made with Passion
            </p>
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Where Timeless Meets Performance</h2>
            <p className="text-lg font-light leading-relaxed mb-6 opacity-90">
              Frontier 1607 was born from one simple belief: that the finest outdoor apparel should marry timeless
              design with uncompromising performance. Each piece in our collection is meticulously crafted to honor both
              heritage and innovation, creating garments that feel as refined in the city as they perform in the
              wilderness.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="/person-pressing-vinyl-heat-transfer-on-clothing.jpg"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
