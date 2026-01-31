export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-light tracking-wider mb-4">
              FRONTIER <span className="font-semibold">1607</span>
            </h3>
            <p className="text-sm font-light opacity-80 leading-relaxed">
              Luxury outdoor apparel for the modern adventurer.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-4 font-light">Shop</h4>
            <ul className="space-y-2 text-sm font-light opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Outerwear
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Layers
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-4 font-light">Company</h4>
            <ul className="space-y-2 text-sm font-light opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-4 font-light">Support</h4>
            <ul className="space-y-2 text-sm font-light opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Care Instructions
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-light opacity-60">© 2025 Frontier 1607. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-light opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
