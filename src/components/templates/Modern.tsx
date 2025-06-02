import React from "react";
import type { TemplateProps } from "../../types/interface.template-props";
import { SocialIcon } from "react-social-icons";
import { formatDate } from "../../utils/helper";

const ModernTemplate: React.FC<TemplateProps> = ({ data, parseArrayField }) => (
  <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden print:shadow-none print:rounded-none">
    {/* Header */}
    <div className="bg-gradient-to-r bg-blue-500 p-8 text-white dark:bg-blue-700 print:bg-blue-600">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.personal.name}</h1>
      {data.personal.headline && (
        <h2 className="text-xl md:text-2xl font-light mb-4 opacity-90">{data.personal.headline}</h2>
      )}
      <div className="flex flex-wrap gap-4 text-sm mt-4">
        {data.personal.email && (
          <div className="flex items-center gap-2">
            <span>{data.personal.email}</span>
          </div>
        )}
        {data.personal.website.link && (
          <div className="flex items-center gap-2">
            <a href={data.personal.website.link} className="hover:underline">
              {data.personal.website.name || data.personal.website.link}
            </a>
          </div>
        )}
        {data.personal.location && (
          <div className="flex items-center gap-2">
            <span>{data.personal.location}</span>
          </div>
        )}
      </div>
      {/* Social links */}
      <div className="flex gap-4 mt-4">
        {data.socials.linkedIn && (
          <SocialIcon url={data.socials.linkedIn} network="linkedin" style={{ width: 24, height: 24 }}   />
        )}
        {data.socials.github && (
          <SocialIcon url={data.socials.github} network="github" style={{ width: 24, height: 24 }} />
        )}
        {data.socials.twitter && (
          <SocialIcon url={data.socials.twitter} network="twitter" style={{ width: 24, height: 24 }} />
        )}
      </div>
    </div>

    {/* Content */}
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left column */}
      <div className="md:col-span-2">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              About Me
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-4 pb-2">
                  <div className="flex justify-between items-start flex-wrap">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{exp.title}</h3>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                  <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">{exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-4 pb-2">
                  <div className="flex justify-between items-start flex-wrap">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{edu.degree}</h3>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</span>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right column */}
      <div>
        {/* Skills - Languages & Keywords */}
        {(parseArrayField(data.skills.programmingLanguages).length > 0 || parseArrayField(data.skills.keywords).length > 0) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Skills
            </h2>
            
            <div className="space-y-4">
              {parseArrayField(data.skills.programmingLanguages).length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Programming Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {parseArrayField(data.skills.programmingLanguages).map((lang, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {parseArrayField(data.skills.keywords).length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Technologies & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {parseArrayField(data.skills.keywords).map((keyword, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {data.projects && data.projects.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {data.projects.map((project, index) => (
                      <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-4 pb-2">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{project.title}</h3>
                        {project.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{project.description}</p>
                        )}
                        {parseArrayField(project.technologies).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {parseArrayField(project.technologies).map((tech, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                <div key={index} className="pb-2">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{cert.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuingOrganization}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{formatDate(cert.date)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Awards
            </h2>
            <div className="space-y-3">
              {data.awards.map((award, index) => (
                <div key={index} className="pb-2">
                  <div className="flex justify-between items-start flex-wrap">
                    <p className="font-medium text-gray-800 dark:text-gray-200">{award.title}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{award.date}</span>
                  </div>
                  {award.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{award.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {parseArrayField(data.languages).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Languages
            </h2>
            <div className="space-y-2">
              {parseArrayField(data.languages).map((lang, index) => (
                <div key={index} className="text-gray-700 dark:text-gray-300">{lang}</div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {parseArrayField(data.interests).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {parseArrayField(data.interests).map((interest, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              References
            </h2>
            <div className="space-y-4">
              {data.references.map((ref, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{ref.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ref.title} at {ref.company}</p>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-500 space-y-0.5">
                    <p>{ref.email}</p>
                    <p>{ref.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ModernTemplate;