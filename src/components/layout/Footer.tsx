export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">ApniSec</h2>
          <p className="text-gray-400">
            Your trusted partner in cybersecurity solutions.
          </p>
        </div>
        {/* Services */}
        <nav>
          <h3 className="text-lg font-semibold text-white mb-2">Services</h3>
          <ul className="space-y-1">
            <li>Cloud Security</li>
            <li>Reteam Assessment</li>
            <li>VAPT</li>
            <li>Security Consulting</li>
          </ul>
        </nav>
        {/* Company */}
        <nav>
          <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Blog</li>
          </ul>
        </nav>
        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <ul className="space-y-1">
            <li>Email: <a href="mailto:info@apnisec.com" className="underline">info@apnisec.com</a></li>
            <li>Phone: +91 XXX XXX XXXX</li>
            <li>Address: India</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; 2024 ApniSec. All rights reserved.
      </div>
    </footer>
  );
}