import { AlertTriangle, Info } from 'lucide-react';
import React from 'react';
import { EducationCategory, SubTopic } from '../constants';

interface ArticleContentProps {
  category: EducationCategory;
  topic: SubTopic;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ category, topic }) => (
  <article className="overflow-hidden rounded-[40px] border border-white bg-white shadow-sm">
    <img src={category.image} alt={category.imageAlt} className="h-52 w-full object-cover" />
    <div className="space-y-7 p-6 sm:p-8">
      <header>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-pink-500">
          {category.title}
        </p>
        <h2 className="text-2xl font-black leading-tight text-gray-800">{topic.title}</h2>
        <p className="mt-3 leading-relaxed text-gray-500">{topic.summary}</p>
      </header>

      {topic.sections.map((section, sectionIndex) => (
        <section key={`${topic.id}-${sectionIndex}`} className="space-y-3">
          {section.title && <h3 className="text-lg font-black text-gray-800">{section.title}</h3>}

          {section.paragraphs?.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="text-[15px] leading-7 text-gray-600">
              {paragraph}
            </p>
          ))}

          {section.bullets && (
            <ul className="space-y-3">
              {section.bullets.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 text-[15px] leading-6 text-gray-600">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {section.steps && (
            <ol className="space-y-4">
              {section.steps.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 text-[15px] leading-6 text-gray-600">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-100 text-xs font-black text-pink-600">
                    {itemIndex + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          )}

          {section.table && (
            <div className="space-y-2">
              <div className="overflow-x-auto rounded-2xl border border-pink-100">
                <table className="min-w-[620px] w-full border-collapse text-left text-xs">
                  <thead className="bg-pink-50 text-pink-700">
                    <tr>
                      {section.table.headers.map((header) => (
                        <th key={header} className="border-b border-pink-100 px-4 py-3 font-black">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="even:bg-gray-50/70">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border-b border-gray-100 px-4 py-3 text-gray-600"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {section.table.note && (
                <p className="text-xs leading-5 text-gray-400">{section.table.note}</p>
              )}
            </div>
          )}
        </section>
      ))}

      {topic.callout && (
        <aside
          className={`flex gap-3 rounded-3xl border p-5 ${
            topic.callout.tone === 'warning'
              ? 'border-amber-100 bg-amber-50 text-amber-900'
              : 'border-blue-100 bg-blue-50 text-blue-900'
          }`}
        >
          {topic.callout.tone === 'warning' ? (
            <AlertTriangle className="mt-0.5 shrink-0" size={20} />
          ) : (
            <Info className="mt-0.5 shrink-0" size={20} />
          )}
          <div>
            <h3 className="font-black">{topic.callout.title}</h3>
            <p className="mt-1 text-sm leading-6 opacity-80">{topic.callout.text}</p>
          </div>
        </aside>
      )}

      <p className="border-t border-gray-100 pt-5 text-xs leading-5 text-gray-400">
        Materi ini bersifat edukasi dan tidak menggantikan pemeriksaan atau saran tenaga kesehatan.
      </p>
    </div>
  </article>
);

export default ArticleContent;
