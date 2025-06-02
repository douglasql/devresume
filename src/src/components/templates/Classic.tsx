import React from "react";
import type { TemplateProps } from "../../types/interface.template-props";
import { formatDate } from "@/utils/helper";

const ClassicTemplate: React.FC<TemplateProps> = ({ data, parseArrayField }) => (
  <div className="max-w-4xl mx-auto bg-white print:bg-white text-slate-900 print:text-black text-base leading-relaxed print:text-sm px-8 pt-12 space-y-8" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
    {/* Header */}
    <header className="text-center border-b border-slate-300 pb-5">
      <h1 className="text-5xl font-semibold tracking-tight text-slate-900 mb-2">
        {data.personal.name}
      </h1>
      {data.personal.headline && (
        <h2 className="text-xl text-slate-600 tracking-wide mb-4">
          {data.personal.headline}
        </h2>
      )}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
        {data.personal.email && <span>{data.personal.email}</span>}
        {data.personal.website.link && (
          <a href={data.personal.website.link} className="underline underline-offset-2">
            {data.personal.website.name || data.personal.website.link}
          </a>
        )}
        {data.personal.location && <span>{data.personal.location}</span>}
      </div>
      <div className="mt-2 flex justify-center gap-6 text-sm">
        {data.socials.linkedIn && <a href={data.socials.linkedIn}>LinkedIn</a>}
        {data.socials.github && <a href={data.socials.github}>GitHub</a>}
        {data.socials.twitter && <a href={data.socials.twitter}>Twitter</a>}
      </div>
    </header>

    {/* Section Reusable */}
    {data.summary && (
      <Section title="Professional Summary">
        <p className="text-left max-w-3xl text-lg text-slate-700 font-light">
          {data.summary}
        </p>
      </Section>
    )}

    {data.experience?.length > 0 && (
      <Section title="Professional Experience">
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between items-start">
              <h4 className="text-lg text-slate-800 font-bold">{exp.title}</h4>
              <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
              </span>
            </div>
            <p className="text-slate-700 font-medium mb-2">{exp.company}</p>
            {exp.description && <p className="text-slate-600 font-light">{exp.description}</p>}
          </div>
        ))}
      </Section>
    )}

    {data.education?.length > 0 && (
      <Section title="Education">
        {data.education.map((edu, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between mb-1">
              <h3 className="text-lg font-bold text-slate-800">{edu.degree}</h3>
              <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
              </span>
            </div>
            <p className="text-slate-700 font-medium">{edu.institution}</p>
          </div>
        ))}
      </Section>
    )}

    {data.projects?.length > 0 && (
      <Section title="Projects">
        {data.projects.map((project, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-1">{project.title}</h3>
            {project.description && <p className="text-slate-600 font-light mb-2">{project.description}</p>}
            {parseArrayField(project.technologies).length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="font-medium">Technologies:</span>
                {parseArrayField(project.technologies).map((tech, i) => (
                  <span key={i} className="bg-slate-100 px-2 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </Section>
    )}

    {(parseArrayField(data.skills.programmingLanguages).length > 0 || parseArrayField(data.skills.keywords).length > 0) && (
      <Section title="Skills">
        <div className="grid md:grid-cols-2 gap-8">
          {parseArrayField(data.skills.programmingLanguages).length > 0 && (
            <SkillList title="Programming Languages" skills={parseArrayField(data.skills.programmingLanguages)} />
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-5">
          {parseArrayField(data.skills.keywords).length > 0 && (
              <SkillList title="Technologies & Frameworks" skills={parseArrayField(data.skills.keywords)} />
          )}
        </div>
      </Section>
    )}

    {data.certifications?.length > 0 && (
      <Section title="Certifications">
        {data.certifications.map((cert, index) => (
          <div key={index} className="flex justify-between items-center border-b border-slate-200">
            <div>
              <p className="text-lg font-bold text-slate-800">{cert.name}</p>
              <p className="text-sm text-slate-600">{cert.issuingOrganization}</p>
            </div>
            <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {formatDate(cert.date)}
            </span>
          </div>
        ))}
      </Section>
    )}

    {data.awards?.length > 0 && (
      <Section title="Awards & Recognition">
        {data.awards.map((award, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-medium text-slate-800">{award.title}</h3>
              <span className="text-sm italic text-slate-600">{award.date}</span>
            </div>
            {award.description && <p className="text-sm text-slate-600">{award.description}</p>}
          </div>
        ))}
      </Section>
    )}

    {parseArrayField(data.languages).length > 0 && (
      <Section title="Languages">
        <TagList tags={parseArrayField(data.languages)} />
      </Section>
    )}

    {parseArrayField(data.interests).length > 0 && (
      <Section title="Interests & Pursuits">
        <TagList tags={parseArrayField(data.interests)} />
      </Section>
    )}

    {data.references?.length > 0 && (
      <Section title="References">
        <div className="grid md:grid-cols-2 gap-6">
          {data.references.map((ref, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-md">
              <p className="font-medium text-slate-800">{ref.name}</p>
              <p className="text-sm text-slate-700 mb-2">{ref.title} at {ref.company}</p>
              <div className="text-sm text-slate-600">
                <p>{ref.email}</p>
                <p>{ref.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    )}
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <h2 className="text-xl font-semibold uppercase text-slate-800 border-b">
      {title}
    </h2>
    {children}
  </section>
);

const SkillList: React.FC<{ title: string; skills: string[] }> = ({ title, skills }) => (
  <div>
    <h3 className="text-lg font-bold text-slate-700 mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className="text-xs text-slate-700 bg-slate-100 px-3 py-1 rounded-full font-medium">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const TagList: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, index) => (
      <span key={index} className="text-xs text-slate-700 bg-slate-100 px-3 py-1 rounded-full font-medium mb-10">
        {tag}
      </span>
    ))}
  </div>
);

export default ClassicTemplate;