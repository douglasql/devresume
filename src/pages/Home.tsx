import { useState, useEffect } from 'react';
import { FileText, Zap, Download, CheckCircle, ArrowRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Super Rápido",
      description: "Crie currículos profissionais em menos de 10 minutos"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Otimizado para ATS",
      description: "Modelos projetados para passar por sistemas de rastreamento de candidatos"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Formatos PDF",
      description: "Baixe como PDF"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DevResume
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors">Funcionalidades</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Construa Sua
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Carreira dos Sonhos
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Crie currículos impressionantes e otimizados para ATS que garantem entrevistas. 
                Modelos profissionais, sugestões inteligentes e downloads instantâneos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link to="/templates">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <span className="flex items-center">
                      Ver Modelos
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por Que Escolher o DevResume?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tudo o que você precisa para criar um currículo profissional que se destaca
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`relative p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:-translate-y-2 ${
                  activeFeature === index ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div id="pricing" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl border border-white/20 p-12">
            <h2 className="text-4xl font-bold mb-6">Pronto Para Conquistar o Emprego dos Seus Sonhos?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de profissionais que conseguiram entrevistas com currículos criados no **DevResume**.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                <span className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Comece Seu Currículo Agora
                </span>
              </button>
              
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                <span>Não é necessário cartão de crédito</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;