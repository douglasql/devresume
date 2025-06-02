import React from "react";
import type { TemplateProps } from "../../types/interface.template-props";
import LinkedInIcon from '../../assets/icons/linkedin-icon.png';
import GitHubIcon from '../../assets/icons/github-6980894_640.png';
import XIcon from '../../assets/icons/x-icon.png';

const cardClass = "bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-purple-800 px-4 py-3 mb-4 shadow";

const CreativeTemplate: React.FC<TemplateProps> = ({ data, parseArrayField }) => (
  <div className="max-w-4xl mx-auto bg-[#faf5ff] dark:bg-gray-900 text-gray-900 dark:text-white print:bg-white print:text-black overflow-hidden">
    <div className="p-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block">
          <h1 className="text-3xl md:text-4xl font-bold mb-1 text-purple-700" style={{letterSpacing: 0.5}}>{data.personal.name}</h1>
        </div>
        {data.personal.headline && (
          <h2 className="text-lg text-gray-600 dark:text-gray-300 mt-3 mb-4 font-medium">{data.personal.headline}</h2>
        )}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {data.personal.email && (
            <span className="text-xs text-purple-700 bg-white dark:bg-gray-800 rounded-full border border-purple-100 dark:border-purple-800 px-3 py-1 mr-1 mb-1">{data.personal.email}</span>
          )}
          {data.personal.website.link && (
            <a href={data.personal.website.link} className="text-xs text-purple-700 bg-white dark:bg-gray-800 rounded-full border border-purple-100 dark:border-purple-800 px-3 py-1 mr-1 mb-1 hover:underline">
              {data.personal.website.name || data.personal.website.link}
            </a>
          )}
          {data.personal.location && (
            <span className="text-xs text-purple-700 bg-white dark:bg-gray-800 rounded-full border border-purple-100 dark:border-purple-800 px-3 py-1 mr-1 mb-1">{data.personal.location}</span>
          )}
        </div>
        <div className="flex justify-center gap-3 mb-2">
          {data.socials.linkedIn && (
            <a href={data.socials.linkedIn} className="inline-flex items-center justify-center w-7 h-7 bg-white border border-purple-200 rounded-full" target="_blank" rel="noopener noreferrer">
              <img src={LinkedInIcon} alt="LinkedIn" className="w-4 h-4" />
            </a>
          )}
          {data.socials.github && (
            <a href={data.socials.github} className="inline-flex items-center justify-center w-7 h-7 bg-white border border-purple-200 rounded-full" target="_blank" rel="noopener noreferrer">
              <img src={GitHubIcon} alt="GitHub" className="w-4 h-4" />
            </a>
          )}
          {data.socials.twitter && (
            <a href={data.socials.twitter} className="inline-flex items-center justify-center w-7 h-7 bg-white border border-purple-200 rounded-full" target="_blank" rel="noopener noreferrer">
              <img src={XIcon} alt="X" className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-10">
          <div className={cardClass}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">About Me</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.summary}</p>
          </div>
        </div>
      )}

      {/* Skills */}
      {(parseArrayField(data.skills.programmingLanguages).length > 0 || parseArrayField(data.skills.keywords).length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {parseArrayField(data.skills.programmingLanguages).map((lang, index) => (
              <span key={`pl-${index}`} className="inline-flex items-center bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full px-3 py-1 text-xs font-medium border border-purple-200 dark:border-purple-700">
                {lang}
              </span>
            ))}
            {parseArrayField(data.skills.keywords).map((kw, index) => (
              <span key={`kw-${index}`} className="inline-flex items-center bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full px-3 py-1 text-xs font-medium border border-purple-200 dark:border-purple-700">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages & Interests */}
      <div className="space-y-6">
        {/* Languages */}
        {parseArrayField(data.languages).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {parseArrayField(data.languages).map((lang, index) => (
                <span key={`lang-${index}`} className="inline-flex items-center bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full px-3 py-1 text-xs font-medium border border-purple-200 dark:border-purple-700">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {parseArrayField(data.interests).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {parseArrayField(data.interests).map((interest, index) => (
                <span key={`int-${index}`} className="inline-flex items-center bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full px-3 py-1 text-xs font-medium border border-purple-200 dark:border-purple-700">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={`exp-${i}`} className="bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-purple-800 px-4 py-3 mb-4 shadow">
                <div className="font-bold text-gray-800 dark:text-gray-200 text-sm">{exp.title}</div>
                <div className="text-purple-600 dark:text-purple-400 text-xs">{exp.company}</div>
                <div className="text-purple-500 dark:text-purple-300 text-xs mb-2">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
                {exp.description && (
                  <div className="text-gray-600 dark:text-gray-300 text-xs">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400">Education</h2>
            {data.education.map((edu, i) => (
              <div key={`edu-${i}`} className="bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-purple-800 px-4 py-3 mb-4 shadow">
                <div className="font-bold text-gray-800 dark:text-gray-200 text-sm">{edu.degree}</div>
                <div className="text-purple-600 dark:text-purple-400 text-xs">{edu.institution}</div>
                <div className="text-purple-500 dark:text-purple-300 text-xs">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default CreativeTemplate;