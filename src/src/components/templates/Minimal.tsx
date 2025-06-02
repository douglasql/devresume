import React from "react";
import type { TemplateProps } from "../../types/interface.template-props";

const MinimalTemplate: React.FC<TemplateProps> = ({ data, parseArrayField }) => (
  <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white print:bg-white print:text-black font-light">
    {/* Header */}
    <div className="mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-thin mb-3 tracking-wide">{data.personal.name}</h1>
      {data.personal.headline && (
        <h2 className="text-lg text-gray-500 dark:text-gray-400 mb-6 font-light tracking-wide uppercase text-sm">
          {data.personal.headline}
        </h2>
      )}
      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        {data.personal.email && <div>{data.personal.email}</div>}
        {data.personal.website.link && (
          <div>
            <a href={data.personal.website.link} className="hover:text-gray-900 dark:hover:text-gray-200">
              {data.personal.website.name || data.personal.website.link}
            </a>
          </div>
        )}
        {data.personal.location && <div>{data.personal.location}</div>}
        <div className="flex justify-center gap-4 pt-2">
          {data.socials.linkedIn && (
            <a href={data.socials.linkedIn} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs uppercase tracking-wider">
              LinkedIn
            </a>
          )}
          {data.socials.github && (
            <a href={data.socials.github} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs uppercase tracking-wider">
              GitHub
            </a>
          )}
          {data.socials.twitter && (
            <a href={data.socials.twitter} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs uppercase tracking-wider">
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>

    {/* Summary */}
    {data.summary && (
      <div className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          Summary
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-light text-justify">
          {data.summary}
        </p>
      </div>
    )}

    {/* Skills */}
    {(parseArrayField(data.skills.programmingLanguages).length > 0 || parseArrayField(data.skills.keywords).length > 0) && (
      <div className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          Skills
        </h2>
        <div className="space-y-4">
          {parseArrayField(data.skills.programmingLanguages).length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Programming Languages
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                {parseArrayField(data.skills.programmingLanguages).join(' • ')}
              </p>
            </div>
          )}
          {parseArrayField(data.skills.keywords).length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Technologies
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                {parseArrayField(data.skills.keywords).join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Languages */}
    {parseArrayField(data.languages).length > 0 && (
      <div className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          Languages
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-light">
          {parseArrayField(data.languages).join(' • ')}
        </p>
      </div>
    )}

    {/* Interests */}
    {parseArrayField(data.interests).length > 0 && (
      <div className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          Interests
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-light">
          {parseArrayField(data.interests).join(' • ')}
        </p>
      </div>
    )}
  </div>
);

export default MinimalTemplate;