
import React, { useEffect, useRef } from 'react';

interface ProjectSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ 
  title, 
  description, 
  imageSrc, 
  imageAlt,
  index
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-transition grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-16 md:py-32 px-8 md:px-16">
      <div className={`flex flex-col justify-center ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
        <span className="text-sm tracking-widest text-black/50 mb-2">{String(index + 1).padStart(2, '0')}</span>
        <h2 className="text-2xl md:text-3xl mb-6">{title}</h2>
        <p className="text-sm md:text-base leading-relaxed">{description}</p>
        <div className="mt-8">
          <a href="#" className="interactive text-sm uppercase tracking-widest menu-link">Ver projeto</a>
        </div>
      </div>
      <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
        <div className="image-container">
          <img src={imageSrc} alt={imageAlt} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
