import React, { useState, useRef } from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import ResumePDF from '../components/pdf/ResumePDF';
import ModernPDF from '../components/pdf/ModernPDF';
import ClassicPDF from '../components/pdf/ClassicPDF';
import MinimalPDF from '../components/pdf/MinimalPDF';
import { useTheme } from '../contexts/ThemeContext';
import type { ResumeFormData } from '../components/ResumeForm';
import type { TemplateType } from '../components/ResumePreview';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import CreativePDF from '../components/pdf/CreativePDF';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Preview: React.FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Obtém o template selecionado e o valida
  const templateParam = searchParams.get("template");
  const validTemplates: TemplateType[] = ['classic', 'modern', 'minimal', 'creative'];
  const template: TemplateType | undefined = templateParam && validTemplates.includes(templateParam as TemplateType)
    ? templateParam as TemplateType
    : undefined;
  
  // Estado inicial corretamente tipado, correspondendo à interface ResumeFormData
  const [resumeData, setResumeData] = useState<ResumeFormData>({
    personal: {
      name: '',
      headline: '',
      email: '',
      website: { name: '', link: '' },
      location: ''
    },
    socials: {
      linkedIn: '',
      github: '',
      twitter: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      programmingLanguages: [],
      keywords: []
    },
    languages: [],
    awards: [],
    certifications: [],
    interests: [],
    projects: [],
    references: []
  });

  const handleFormSubmit = (data: ResumeFormData) => {
    setResumeData(data);
  };

  // Gera um PDF adequado com texto selecionável e links clicáveis
  const handleExportPDF = async () => {
    // Exibe o estado de carregamento
    const button = document.querySelector('#exportButton') as HTMLButtonElement;
    if (button) {
      button.textContent = '⏳ Gerando PDF...';
      button.disabled = true;
    }
    
    try {
      // Mede a altura da pré-visualização do currículo
      const resumeElement = resumeRef.current;
      let contentHeight = 1000; // Altura padrão de fallback
      
      if (resumeElement) {
        // Obtém a altura real do conteúdo do currículo
        contentHeight = Math.ceil(resumeElement.getBoundingClientRect().height);
        // Adiciona um preenchimento para garantir que todo o conteúdo caiba
        contentHeight += 50;
      }
      
      // Cria um blob a partir do componente PDF apropriado com base no template
      let pdfDocument;
      const selectedTemplate = template || 'classic';
      
      // Usa templates especializados para cada tipo de template
      if (selectedTemplate === 'modern') {
        pdfDocument = <ModernPDF data={resumeData} />;
      } else if (selectedTemplate === 'classic') {
        pdfDocument = <ClassicPDF data={resumeData} />;
      } else if (selectedTemplate === 'creative') {
        pdfDocument = <CreativePDF data={resumeData} contentHeight={contentHeight} />;
      } else if (selectedTemplate === 'minimal') {
        pdfDocument = <MinimalPDF data={resumeData} />;
      } else {
        pdfDocument = <ResumePDF data={resumeData} template={selectedTemplate} />;
      }
      
      const blob = await pdf(pdfDocument).toBlob();
      
      // Usa file-saver para salvar o blob
      saveAs(blob, 'resume.pdf');
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Falha ao gerar PDF. Por favor, tente novamente.');
    } finally {
      if (button) {
        button.textContent = '📃 Exportar para PDF';
        button.disabled = false;
      }
    }
  };

  const redirectTemplates = () => {
    toast("Redirecionando para a página de Modelos...");
    setTimeout(() => {
      navigate("/templates");
    }, 4000);
  }

  return (
    <div className="min-h-screen flex flex-col dark:border-gray-700">
      {/* Contêiner principal com altura mínima */}
      <div className={`flex-1 flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Barra lateral do formulário - Sempre rolável */}
        <div 
          className={`
            lg:w-2/5 xl:w-1/3 
            ${isDarkMode 
              ? 'bg-gray-800 lg:border-r border-gray-700' 
              : 'bg-white lg:border-r border-gray-200'
            }
            h-[50vh] lg:h-[calc(100vh-1px)]
            overflow-y-auto
            sticky top-0
          `}
        >
          <div className="sticky top-0 z-10 p-4 lg:p-6 bg-inherit border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-1">
              <h1 className={`
                text-xl lg:text-2xl font-bold 
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                DevResume
              </h1>
              
              {/* Indicador de tema */}
              <div className={`
                px-2 rounded text-xs font-medium
                ${isDarkMode 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                <ThemeToggle />
              </div>
            </div>
            
            <div className="p-4 lg:p-6 pt-0">
              <ResumeForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div> {/* <-- DIV FECHANDO AQUI */}

        {/* Área de pré-visualização - Rola apenas quando necessário */}
        <div className="lg:w-3/5 xl:w-2/3 h-[50vh] lg:h-[calc(100vh-1px)] flex flex-col overflow-hidden">
          {/* Cabeçalho de pré-visualização fixo */}
          <div className={`
            sticky top-0 z-10 p-4 lg:p-6 
            ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}
            border-b border-gray-200 dark:border-gray-700
          `}>
            <div className="flex items-center justify-between">
              <h2 className={`
                text-lg lg:text-xl font-semibold 
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                Pré-visualização do Currículo
              </h2>
              
              {/* Botão de exportar */}
              <Button
                variant="outline"
                onClick={redirectTemplates}
              >
                Voltar para Modelos
              </Button>
              <button
                id="exportButton"
                onClick={handleExportPDF}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-200
                  ${isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                📃 Exportar para PDF
              </button>
            </div>
          </div>

          {/* Conteúdo rolável da pré-visualização */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 pt-0">
            {/* Contêiner da pré-visualização com efeito de papel */}
            <div 
              ref={resumeRef}
              className={`
                ${isDarkMode 
                  ? 'bg-gray-800 shadow-2xl' 
                  : 'bg-white shadow-lg'
                }
                rounded-lg p-6 lg:p-8
                print:shadow-none print:rounded-none print:p-0
                min-h-[800px]
              `}
              style={{
                // Estilos inline para substituir quaisquer cores oklch para geração de PDF
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                color: isDarkMode ? '#ffffff' : '#000000'
              }}
            >
              <ResumePreview data={resumeData} template={template || 'classic'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;