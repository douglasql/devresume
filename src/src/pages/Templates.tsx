import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  description: string;
  preview?: string;
  features: string[];
  category: string;
  color: string;
}

const templates: Template[] = [
  {
    id: "classic",
    name: "Clássico Executivo",
    description: "Um modelo sofisticado projetado para profissionais e executivos seniores que buscam elegância atemporal.",
    category: "Profissional",
    color: "from-slate-600 to-slate-800",
    features: [
      "Formatação de nível executivo",
      "Tipografia profissional",
      "Estrutura organizacional limpa",
      "Layout otimizado para ATS"
    ]
  },
  {
    id: "modern",
    name: "Profissional Moderno",
    description: "Design moderno que equilibra inovação com profissionalismo para o ambiente de trabalho dinâmico de hoje.",
    category: "Moderno",
    color: "from-blue-600 to-blue-800",
    features: [
      "Hierarquia visual moderna",
      "Uso estratégico de espaços em branco",
      "Elementos de destaque profissionais",
      "Design responsivo para celular"
    ]
  },
  {
    id: "minimal",
    name: "Minimalista Executivo",
    description: "Minimalismo refinado que permite que suas conquistas se destaquem através da simplicidade sofisticada.",
    category: "Minimalista",
    color: "from-gray-700 to-gray-900",
    features: [
      "Simplicidade sofisticada",
      "Tipografia premium",
      "Foco estratégico no conteúdo",
      "Espaçamento elegante"
    ]
  },
  {
    id: "creative",
    name: "Profissional Criativo",
    description: "Design inovador que exibe criatividade, mantendo o profissionalismo que os empregadores esperam.",
    category: "Criativo",
    color: "from-purple-600 to-purple-800",
    features: [
      "Elementos visuais criativos",
      "Apresentação profissional",
      "Design de layout único",
      "Estilo apropriado para a indústria"
    ]
  }
];

const Templates: React.FC = () => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();

  const categories = ["Todos", ...Array.from(new Set(templates.map(t => t.category)))]; // Traduzindo 'All' para 'Todos'
  const filteredTemplates = selectedCategory === "Todos" // Atualizando a condição para 'Todos'
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleTemplateSelect = (templateId: string) => {
    // Traduzindo a mensagem do toast
    toast(`Redirecionando para o modelo "${templates.find(t => t.id === templateId)?.name}"!`);
    setTimeout(() => {
      navigate(`/preview?template=${templateId}`);
    }, 3000);
  };

  const handleCreateNew = () => {
    // Lida com a ação de criar novo - você pode substituir isso pela sua lógica de roteamento
    // Traduzindo a mensagem do toast
    toast("Redirecionando para o modelo Clássico Executivo!");
    setTimeout(() => {
      navigate("/preview?templates=classic");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Seção Hero */}
      <header className="relative bg-white shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Modelos de Currículo Profissional
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Escolha entre nossa coleção de modelos profissionalmente projetados, 
              criados para ajudá-lo a causar uma impressão duradoura nos gerentes de contratação.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtro de Categoria */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de Modelos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Pré-visualização do Modelo */}
              <div className="relative h-64 overflow-hidden">
                {template.preview ? (
                  <img 
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className={`h-full bg-gradient-to-br ${template.color} flex items-center justify-center relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative text-white">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-semibold opacity-90">{template.name}</p>
                    </div>
                  </div>
                )}
                {/* Selo de Categoria */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full">
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{template.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{template.description}</p>
                
                {/* Funcionalidades */}
                <div className="space-y-3 mb-6">
                  {template.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-center transform transition-all duration-200"
                      style={{
                        transitionDelay: hoveredTemplate === template.id ? `${index * 50}ms` : '0ms'
                      }}
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Botão de Ação */}
                <button 
                  onClick={() => handleTemplateSelect(template.id)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg group"
                >
                  Selecionar Modelo
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Inferior */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Pronto para Criar Seu Currículo Profissional?</h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de profissionais que conquistaram seus empregos dos sonhos com nossos modelos.
          </p>
          <button 
            onClick={handleCreateNew}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Comece Agora
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Templates;