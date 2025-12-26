import { Shield, Zap, Lock, Users, CheckCircle, TrendingUp } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Advanced Protection',
      description: 'Multi-layered security architecture to protect against sophisticated threats.',
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: '24/7 threat detection and immediate response to security incidents.',
    },
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'Enterprise-grade encryption for data at rest and in transit.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified security professionals with years of industry experience.',
    },
    {
      icon: CheckCircle,
      title: 'Compliance Ready',
      description: 'Meet regulatory requirements with our compliance-focused solutions.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'Regular security audits and updates to stay ahead of threats.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Why Choose ApniSec?
          </h2>
          <p className="text-lg text-gray-600">
            Industry-leading security features designed for modern businesses
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}