import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface ResumeFormData {
  personal: {
    name: string;
    headline?: string;
    email: string;
    website: {
      name: string;
      link: string;
    };
    location?: string;
  };
  socials: {
    linkedIn?: string;
    github?: string;
    twitter?: string;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate?: string;
  }>;
  skills: {
    programmingLanguages: string[];
    keywords: string[];
  };
  languages?: string[];
  awards: Array<{
    title: string;
    date: string;
    description?: string;
  }>;
  certifications: Array<{
    name: string;
    issuingOrganization: string;
    date: string;
  }>;
  interests?: string[];
  projects: Array<{
    title: string;
    description?: string;
    technologies: string[];
  }>;
  references: Array<{
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
  }>;
}

// Função auxiliar para converter string separada por vírgulas em array
const stringToArray = (value: any): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
  }
  return [];
};

const schema = yup.object({
  personal: yup.object({
    name: yup.string().required('Nome é obrigatório'),
    headline: yup.string(),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    website: yup.object({
      name: yup.string(),
      link: yup.string().url('URL inválida'),
    }).required('Site é obrigatório'),
    location: yup.string(),
  }).required('Informações pessoais são obrigatórias'),
  socials: yup.object({
    linkedIn: yup.string().url('URL do LinkedIn inválida'),
    github: yup.string().url('URL do GitHub inválida'),
    twitter: yup.string().url('URL do Twitter inválida'),
  }),
  summary: yup.string(),
  experience: yup.array().of(yup.object({
    title: yup.string().required('Título é obrigatório'),
    company: yup.string().required('Empresa é obrigatória'),
    startDate: yup.string().required('Data de início é obrigatória'),
    endDate: yup.string(),
    description: yup.string(),
  })),
  education: yup.array().of(yup.object({
    degree: yup.string().required('Formação é obrigatória'),
    institution: yup.string().required('Instituição é obrigatória'),
    startDate: yup.string().required('Data de início é obrigatória'),
    endDate: yup.string(),
  })),
  skills: yup.object({
    programmingLanguages: yup.mixed().transform(stringToArray).test(
      'min-length',
      'Pelo menos uma linguagem de programação é obrigatória',
      (value) => {
        if (!value) return false;
        return Array.isArray(value) && value.length > 0;
      }
    ),
    keywords: yup.mixed().transform(stringToArray),
  }),
  languages: yup.mixed().transform(stringToArray),
  awards: yup.array().of(yup.object({
    title: yup.string().required('Título é obrigatório'),
    date: yup.string().required('Data é obrigatória'),
    description: yup.string(),
  })),
  certifications: yup.array().of(yup.object({
    name: yup.string().required('Nome é obrigatório'),
    issuingOrganization: yup.string().required('Organização é obrigatória'),
    date: yup.string().required('Data é obrigatória'),
  })),
  interests: yup.mixed().transform(stringToArray),
  projects: yup.array().of(yup.object({
    title: yup.string().required('Título é obrigatório'),
    description: yup.string(),
    technologies: yup.mixed().transform(stringToArray),
  })),
  references: yup.array().of(yup.object({
    name: yup.string().required('Nome é obrigatório'),
    title: yup.string().required('Título é obrigatório'),
    company: yup.string().required('Empresa é obrigatória'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    phone: yup.string().matches(/^[0-9\-\+]+$/, 'Número de telefone inválido'),
  })),
}).required();

interface ResumeFormProps {
  onSubmit: (data: ResumeFormData) => void;
}

const STORAGE_KEY = 'resumeFormData';

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  // Carrega os dados salvos do localStorage quando o componente é montado
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Reseta o formulário com os dados salvos
        reset(parsedData);
      } catch (error) {
        console.error('Erro ao analisar os dados do currículo salvos:', error);
      }
    }
  }, []);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ResumeFormData>({
    resolver: yupResolver(schema as any),
    defaultValues: {
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
      skills: { programmingLanguages: [], keywords: [] },
      languages: [],
      awards: [],
      certifications: [],
      interests: [],
      experience: [],
      education: [],
      projects: [],
      references: []
    }
  });

  // Arrays de campo para seções dinâmicas
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({
    control,
    name: 'awards'
  });

  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: 'certifications'
  });

  const { fields: referenceFields, append: appendReference, remove: removeReference } = useFieldArray({
    control,
    name: 'references'
  });

  const handleSubmitForm = (data: ResumeFormData) => {
    // Salva os dados do formulário no localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar os dados do currículo:', error);
    }
    // Processa as tecnologias dos projetos de strings separadas por vírgulas para arrays
    const processedData = {
      ...data,
      projects: data.projects.map(project => ({
        ...project,
        technologies: typeof project.technologies === 'string' 
          ? (project.technologies as string).split(',').map(t => t.trim()).filter(t => t.length > 0)
          : project.technologies || []
      }))
    };
    onSubmit(processedData);
  };

  // Classes de estilo consistentes
  const inputClasses = `
    mt-1 block w-full rounded-md border shadow-sm px-3 py-2
    border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-700 
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1
    transition-colors duration-200
  `;

  const labelClasses = `
    block text-sm font-medium mb-1
    text-gray-700 dark:text-gray-300
  `;

  const sectionHeaderClasses = `
    text-xl font-semibold mb-4 pb-2 border-b
    text-gray-900 dark:text-white
    border-gray-200 dark:border-gray-700
  `;

  const buttonClasses = `
    inline-flex items-center px-3 py-2 border border-transparent text-sm 
    leading-4 font-medium rounded-md focus:outline-none focus:ring-2 
    focus:ring-offset-2 transition-colors duration-200
  `;

  const addButtonClasses = `
    ${buttonClasses}
    text-indigo-700 bg-indigo-100 hover:bg-indigo-200 
    focus:ring-indigo-500 dark:bg-indigo-900 dark:text-indigo-200 
    dark:hover:bg-indigo-800 dark:focus:ring-offset-gray-800
  `;

  const removeButtonClasses = `
    ${buttonClasses}
    text-red-700 bg-red-100 hover:bg-red-200 
    focus:ring-red-500 dark:bg-red-900 dark:text-red-200 
    dark:hover:bg-red-800 dark:focus:ring-offset-gray-800
  `;

  const cardClasses = `
    p-4 border rounded-lg space-y-4
    border-gray-200 dark:border-gray-700
    bg-gray-50 dark:bg-gray-800
  `;

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
      {/* Detalhes Pessoais */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Detalhes Pessoais</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className={labelClasses}>Nome Completo *</label>
            <input
              type="text"
              id="name"
              {...register('personal.name')}
              className={inputClasses}
              placeholder="Digite seu nome completo"
            />
            {errors.personal?.name && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.personal.name.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="headline" className={labelClasses}>Título Profissional</label>
            <input
              type="text"
              id="headline"
              {...register('personal.headline')}
              className={inputClasses}
              placeholder="Ex: Engenheiro de Software Sênior"
            />
          </div>
          
          <div>
            <label htmlFor="email" className={labelClasses}>E-mail *</label>
            <input
              type="email"
              id="email"
              {...register('personal.email')}
              className={inputClasses}
              placeholder="seu.email@exemplo.com"
            />
            {errors.personal?.email && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.personal.email.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="location" className={labelClasses}>Localização</label>
            <input
              type="text"
              id="location"
              {...register('personal.location')}
              className={inputClasses}
              placeholder="Cidade, País"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="websiteName" className={labelClasses}>Nome do Site</label>
              <input
                type="text"
                id="websiteName"
                {...register('personal.website.name')}
                className={inputClasses}
                placeholder="Portfólio"
              />
            </div>
            <div>
              <label htmlFor="websiteLink" className={labelClasses}>URL do Site</label>
              <input
                type="url"
                id="websiteLink"
                {...register('personal.website.link')}
                className={inputClasses}
                placeholder="https://seusite.com"
              />
              {errors.personal?.website?.link && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.personal.website.link.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Links Sociais */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Links Sociais</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="linkedin" className={labelClasses}>LinkedIn</label>
            <input
              type="url"
              id="linkedin"
              {...register('socials.linkedIn')}
              className={inputClasses}
              placeholder="https://linkedin.com/in/seuperfil"
            />
            {errors.socials?.linkedIn && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.socials.linkedIn.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="github" className={labelClasses}>GitHub</label>
            <input
              type="url"
              id="github"
              {...register('socials.github')}
              className={inputClasses}
              placeholder="https://github.com/seunomeusuario"
            />
            {errors.socials?.github && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.socials.github.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="twitter" className={labelClasses}>Twitter</label>
            <input
              type="url"
              id="twitter"
              {...register('socials.twitter')}
              className={inputClasses}
              placeholder="https://twitter.com/seunomeusuario"
            />
            {errors.socials?.twitter && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.socials.twitter.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Resumo Profissional */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Resumo Profissional</h2>
        <div>
          <label htmlFor="summary" className={labelClasses}>Resumo</label>
          <textarea
            id="summary"
            {...register('summary')}
            rows={4}
            className={inputClasses}
            placeholder="Escreva um breve resumo profissional destacando suas principais conquistas e habilidades..."
          />
        </div>
      </div>

      {/* Experiência */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Experiência de Trabalho</h2>
          <button
            type="button"
            onClick={() => appendExperience({ title: '', company: '', startDate: '', endDate: '', description: '' })}
            className={addButtonClasses}
          >
            ➕ Adicionar Experiência
          </button>
        </div>
        
        {experienceFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Experiência #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className={removeButtonClasses}
              >
                🗑️ Remover
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Cargo *</label>
                <input
                  {...register(`experience.${index}.title`)}
                  className={inputClasses}
                  placeholder="Engenheiro de Software"
                />
                {errors.experience?.[index]?.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.experience[index]?.title?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Empresa *</label>
                <input
                  {...register(`experience.${index}.company`)}
                  className={inputClasses}
                  placeholder="Nome da Empresa"
                />
                {errors.experience?.[index]?.company && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.experience[index]?.company?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Data de Início *</label>
                <input
                  type="month"
                  {...register(`experience.${index}.startDate`)}
                  className={inputClasses}
                />
                {errors.experience?.[index]?.startDate && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.experience[index]?.startDate?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Data de Término</label>
                <input
                  type="month"
                  {...register(`experience.${index}.endDate`)}
                  className={inputClasses}
                  placeholder="Deixe vazio se for a posição atual"
                />
              </div>
            </div>
            
            <div>
              <label className={labelClasses}>Descrição</label>
              <textarea
                {...register(`experience.${index}.description`)}
                rows={3}
                className={inputClasses}
                placeholder="Descreva suas responsabilidades e conquistas..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Educação */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Educação</h2>
          <button
            type="button"
            onClick={() => appendEducation({ degree: '', institution: '', startDate: '', endDate: '' })}
            className={addButtonClasses}
          >
            ➕ Adicionar Educação
          </button>
        </div>
        
        {educationFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Educação #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className={removeButtonClasses}
              >
                🗑️ Remover
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClasses}>Formação *</label>
                <input
                  {...register(`education.${index}.degree`)}
                  className={inputClasses}
                  placeholder="Bacharel em Ciência da Computação"
                />
                {errors.education?.[index]?.degree && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.education[index]?.degree?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Instituição *</label>
                <input
                  {...register(`education.${index}.institution`)}
                  className={inputClasses}
                  placeholder="Nome da Universidade"
                />
                {errors.education?.[index]?.institution && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.education[index]?.institution?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Data de Início *</label>
                <input
                  type="month"
                  {...register(`education.${index}.startDate`)}
                  className={inputClasses}
                />
                {errors.education?.[index]?.startDate && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.education[index]?.startDate?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Data de Término</label>
                <input
                  type="month"
                  {...register(`education.${index}.endDate`)}
                  className={inputClasses}
                  placeholder="Deixe vazio se estiver em andamento"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Habilidades */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Habilidades</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="programmingLanguages" className={labelClasses}>
              Linguagens de Programação *
            </label>
            <input
              type="text"
              id="programmingLanguages"
              {...register('skills.programmingLanguages')}
              className={inputClasses}
              placeholder="JavaScript, Python, Java (separar com vírgulas)"
            />
            {errors.skills?.programmingLanguages && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.skills.programmingLanguages.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="keywords" className={labelClasses}>Palavras-chave Técnicas</label>
            <input
              type="text"
              id="keywords"
              {...register('skills.keywords')}
              className={inputClasses}
              placeholder="React, Node.js, Docker, AWS (separar com vírgulas)"
            />
          </div>
        </div>
      </div>

      {/* Idiomas */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Idiomas</h2>
        <div>
          <label htmlFor="languages" className={labelClasses}>Idiomas Falados</label>
          <input
            type="text"
            id="languages"
            {...register('languages')}
            className={inputClasses}
            placeholder="Inglês (Nativo), Espanhol (Fluente) (separar com vírgulas)"
          />
        </div>
      </div>

      {/* Interesses */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Interesses e Hobbies</h2>
        <div>
          <label htmlFor="interests" className={labelClasses}>Interesses</label>
          <input
            type="text"
            id="interests"
            {...register('interests')}
            className={inputClasses}
            placeholder="Fotografia, Caminhada, Código Aberto (separar com vírgulas)"
          />
        </div>
      </div>

      {/* Projetos */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Projetos</h2>
          <button
            type="button"
            onClick={() => appendProject({ title: '', description: '', technologies: [] })}
            className={addButtonClasses}
          >
            ➕ Adicionar Projeto
          </button>
        </div>
        
        {projectFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Projeto #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className={removeButtonClasses}
              >
                🗑️ Remover
              </button>
            </div>
            
            <div>
              <label className={labelClasses}>Título do Projeto *</label>
              <input
                {...register(`projects.${index}.title`)}
                className={inputClasses}
                placeholder="Plataforma de E-commerce"
              />
              {errors.projects?.[index]?.title && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.projects[index]?.title?.message}
                </p>
              )}
            </div>
            
            <div>
              <label className={labelClasses}>Descrição</label>
              <textarea
                {...register(`projects.${index}.description`)}
                rows={3}
                className={inputClasses}
                placeholder="Descreva o projeto, seu papel e principais conquistas..."
              />
            </div>
            
            <div>
              <label className={labelClasses}>Tecnologias Utilizadas</label>
              <input
                {...register(`projects.${index}.technologies`)}
                className={inputClasses}
                placeholder="React, Node.js, MongoDB (separar com vírgulas)"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Prêmios */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Prêmios e Conquistas</h2>
          <button
            type="button"
            onClick={() => appendAward({ title: '', date: '', description: '' })}
            className={addButtonClasses}
          >
            ➕ Adicionar Prêmio
          </button>
        </div>
        
        {awardFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Prêmio #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeAward(index)}
                className={removeButtonClasses}
              >
                🗑️ Remover
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Título do Prêmio *</label>
                <input
                  {...register(`awards.${index}.title`)}
                  className={inputClasses}
                  placeholder="Funcionário do Ano"
                />
                {errors.awards?.[index]?.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.awards[index]?.title?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Data *</label>
                <input
                  type="month"
                  {...register(`awards.${index}.date`)}
                  className={inputClasses}
                />
                {errors.awards?.[index]?.date && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.awards[index]?.date?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label className={labelClasses}>Descrição</label>
              <textarea
                {...register(`awards.${index}.description`)}
                rows={2}
                className={inputClasses}
                placeholder="Breve descrição do prêmio..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Certificações */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Certificações</h2>
          <button
            type="button"
            onClick={() => appendCertification({ name: '', issuingOrganization: '', date: '' })}
            className={addButtonClasses}
          >
            ➕ Adicionar Certificação
          </button>
        </div>
        
        {certificationFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Certificação #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className={removeButtonClasses}
              >
                🗑️ Remover
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClasses}>Nome da Certificação *</label>
                <input
                  {...register(`certifications.${index}.name`)}
                  className={inputClasses}
                  placeholder="AWS Certified Solutions Architect"
                />
                {errors.certifications?.[index]?.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.certifications[index]?.name?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Organização Emissora *</label>
                <input
                  {...register(`certifications.${index}.issuingOrganization`)}
                  className={inputClasses}
                  placeholder="Amazon Web Services"
                />
                {errors.certifications?.[index]?.issuingOrganization && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.certifications[index]?.issuingOrganization?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Data de Obtenção *</label>
                <input
                  type="month"
                  {...register(`certifications.${index}.date`)}
                  className={inputClasses}
                />
                {errors.certifications?.[index]?.date && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.certifications[index]?.date?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Referências */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Referências</h2>
          <button
            type="button"
            onClick={() => appendReference({ name: '', title: '', company: '', email: '', phone: '' })}
            className={addButtonClasses}
          >
            ➕ Adicionar Referência
          </button>
        </div>
        
        {referenceFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Referência #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeReference(index)}
                className={removeButtonClasses}
              >
                🗑️ Remover
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Nome Completo *</label>
                <input
                  {...register(`references.${index}.name`)}
                  className={inputClasses}
                  placeholder="Nome do contato"
                />
                {errors.references?.[index]?.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.name?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Título *</label>
                <input
                  {...register(`references.${index}.title`)}
                  className={inputClasses}
                  placeholder="Gerente de Contratação"
                />
                {errors.references?.[index]?.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.title?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Empresa *</label>
                <input
                  {...register(`references.${index}.company`)}
                  className={inputClasses}
                  placeholder="Empresa do contato"
                />
                {errors.references?.[index]?.company && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.company?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>E-mail *</label>
                <input
                  type="email"
                  {...register(`references.${index}.email`)}
                  className={inputClasses}
                  placeholder="email.contato@exemplo.com"
                />
                {errors.references?.[index]?.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.email?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClasses}>Telefone</label>
              <input
                type="text"
                {...register(`references.${index}.phone`)}
                className={inputClasses}
                placeholder="+55 11 99999-9999"
              />
              {errors.references?.[index]?.phone && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.references[index]?.phone?.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botão de Envio */}
      <div className="pt-6">
        <button
          type="submit"
          className={`
            w-full px-6 py-3 rounded-md text-lg font-semibold
            bg-indigo-600 text-white hover:bg-indigo-700
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            transition-colors duration-200
          `}
        >
          Salvar e Gerar Currículo
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;