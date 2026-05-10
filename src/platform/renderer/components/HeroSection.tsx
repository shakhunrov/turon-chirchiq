import { motion } from 'framer-motion';
import { Button } from '../../design-system/Button';

type HeroAction = {
  label: string;
  href: string;
  variant?: 'primary' | 'outline';
};

type HeroSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: HeroAction[];
};

export default function HeroSection({ eyebrow, title, subtitle, image, actions = [] }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {eyebrow && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                {eyebrow}
              </span>
            )}
            {title && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-head font-extrabold text-navy leading-[1.05] tracking-tight mb-8">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-navy/60 leading-relaxed max-w-2xl mb-12 font-medium">
                {subtitle}
              </p>
            )}
            {actions.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {actions.map((action, i) => (
                  <Button 
                    key={`${action.href}-${i}`} 
                    href={action.href} 
                    variant={action.variant || (i === 0 ? 'primary' : 'outline')}
                    className="px-10 py-5 text-xs font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:translate-y-[-4px] transition-all"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      {image && (
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src={image} alt="" className="w-full h-full object-cover" loading="eager" />
        </div>
      )}
    </section>
  );
}
