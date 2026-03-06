'use client';

interface PageHeaderProps {
  step?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * A standardized header for main sections and admin pages.
 */
export default function PageHeader({ 
  step, 
  title, 
  subtitle, 
  className = "" 
}: PageHeaderProps) {
  return (
    <div className={`mb-10 space-y-4 animate-reveal ${className}`}>
      {step && (
        <span className="text-sm tracking-mega text-brand/30 uppercase font-medium">
          Step {step}
        </span>
      )}
      
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif tracking-widest text-foreground lowercase">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-sm md:text-base text-foreground/40 font-light max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="h-px w-12 bg-black/10" />
    </div>
  );
}
