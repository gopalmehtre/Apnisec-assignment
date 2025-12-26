import { Shield, Search, Cloud, Lock, Users, AlertTriangle } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Cloud,
      title: 'Cloud Security',
      description: 'Protect your cloud infrastructure with advanced security measures and continuous monitoring.',
      features: ['AWS Security', 'Azure Protection', 'GCP Security', 'Multi-cloud Solutions'],
    },
    {
      icon: Search,
      title: 'Reteam Assessment',
      description: 'Comprehensive red team exercises to identify vulnerabilities before attackers do.',
      features: ['Penetration Testing', 'Social Engineering', 'Physical Security', 'Attack Simulation'],
    },
    {
      icon: AlertTriangle,
      title: 'VAPT Services',
      description: 'Vulnerability Assessment and Penetration Testing to secure your applications and networks.',
      features: ['Web App Testing', 'Network Scanning', 'API Security', 'Mobile App Testing'],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Our Services</h2>
          <p className="text-lg text-gray-600">
            Comprehensive cybersecurity solutions tailored to your needs
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{service.description}</p>
                <ul className="text-sm text-gray-700 space-y-1 w-full">
                  {service.features.map((feature, idx) => (
                    <li key={feature} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}