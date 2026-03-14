import React, { useState, useEffect, useRef } from 'react';
import { Send, Mail, MapPin, Linkedin, Instagram, ArrowRight, MessageSquare, User, Building2, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: String(t('contact.form.error')), variant: 'destructive' });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'SEND_FAILED');
      setSent(true);
      toast({ title: String(t('contact.form.success')), variant: 'default' });
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch {
      toast({ title: String(t('contact.form.error')), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@gmvsolution.fr', href: 'mailto:contact@gmvsolution.fr', color: '#3B82F6' },
    { icon: MapPin, label: 'Localisation', value: 'Paris, France', href: '#', color: '#06B6D4' },
    { icon: Linkedin, label: 'LinkedIn', value: 'GMV Solution', href: 'https://www.linkedin.com/company/gmv-solution', color: '#0A66C2' },
    { icon: Instagram, label: 'Instagram', value: '@gmv.solution.fr', href: 'https://www.instagram.com/gmv.solution.fr', color: '#E1306C' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(220 20% 6%) 0%, hsl(220 20% 4%) 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(213 94% 50% / 0.5), transparent)' }} />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle, hsl(213 94% 50%), transparent 70%)' }}
      />
      <div
        className="absolute inset-0 opacity-4"
        style={{
          backgroundImage: `linear-gradient(hsl(213 94% 50% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(213 94% 50% / 0.4) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm mb-4"
            style={{ background: 'hsl(213 94% 50% / 0.1)', backdropFilter: 'blur(10px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Contact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('contact.title')}</h2>
          <p className="text-xl text-blue-200/60">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <div
            ref={infoRef}
            className="reveal-left lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Parlons de votre projet</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Que vous ayez un projet précis ou simplement envie d'explorer les possibilités, notre équipe est là pour vous guider.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group"
                  style={{
                    background: `${info.color}08`,
                    borderColor: `${info.color}20`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${info.color}50`;
                    (e.currentTarget as HTMLElement).style.background = `${info.color}15`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${info.color}20`;
                    (e.currentTarget as HTMLElement).style.background = `${info.color}08`;
                    (e.currentTarget as HTMLElement).style.transform = '';
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${info.color}25`, border: `1px solid ${info.color}40` }}
                  >
                    <info.icon className="w-4 h-4" style={{ color: info.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-white/30">{info.label}</div>
                    <div className="text-sm text-white/80 font-medium">{info.value}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-white/20 group-hover:text-white/50 transition-colors" />
                </a>
              ))}
            </div>

            {/* Response time */}
            <div
              className="p-4 rounded-xl border border-green-500/20"
              style={{ background: 'rgba(34, 197, 94, 0.05)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-green-400">Disponible</span>
              </div>
              <p className="text-xs text-white/40">Réponse garantie sous 24h ouvrées</p>
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className="reveal-right lg:col-span-3"
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-green-500/20" style={{ background: 'rgba(34, 197, 94, 0.05)' }}>
                <CheckCircle className="w-16 h-16 text-green-400 mb-4 animate-scale-in" />
                <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                <p className="text-white/50">Nous vous répondrons dans les meilleurs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="relative">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200`}
                      style={{ color: focused === 'name' ? '#3B82F6' : 'rgba(255,255,255,0.3)' }}
                    >
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder={String(t('contact.form.name'))}
                      required
                      autoComplete="name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border text-white text-sm placeholder:text-white/30 outline-none transition-all duration-200"
                      style={{
                        background: 'hsl(220 20% 12%)',
                        borderColor: focused === 'name' ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                        boxShadow: focused === 'name' ? '0 0 0 3px rgba(59, 130, 246, 0.15)' : '',
                      }}
                    />
                  </div>
                  {/* Email */}
                  <div className="relative">
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                      style={{ color: focused === 'email' ? '#3B82F6' : 'rgba(255,255,255,0.3)' }}
                    >
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder={String(t('contact.form.email'))}
                      required
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border text-white text-sm placeholder:text-white/30 outline-none transition-all duration-200"
                      style={{
                        background: 'hsl(220 20% 12%)',
                        borderColor: focused === 'email' ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                        boxShadow: focused === 'email' ? '0 0 0 3px rgba(59, 130, 246, 0.15)' : '',
                      }}
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="relative">
                  <div
                    className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                    style={{ color: focused === 'company' ? '#3B82F6' : 'rgba(255,255,255,0.3)' }}
                  >
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    onFocus={() => setFocused('company')}
                    onBlur={() => setFocused(null)}
                    placeholder={String(t('contact.form.company'))}
                    autoComplete="organization"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-white text-sm placeholder:text-white/30 outline-none transition-all duration-200"
                    style={{
                      background: 'hsl(220 20% 12%)',
                      borderColor: focused === 'company' ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                      boxShadow: focused === 'company' ? '0 0 0 3px rgba(59, 130, 246, 0.15)' : '',
                    }}
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <div
                    className="absolute left-3 top-3.5 transition-colors duration-200"
                    style={{ color: focused === 'message' ? '#3B82F6' : 'rgba(255,255,255,0.3)' }}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder={String(t('contact.form.message'))}
                    required
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-white text-sm placeholder:text-white/30 outline-none transition-all duration-200 resize-none"
                    style={{
                      background: 'hsl(220 20% 12%)',
                      borderColor: focused === 'message' ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                      boxShadow: focused === 'message' ? '0 0 0 3px rgba(59, 130, 246, 0.15)' : '',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: loading ? 'hsl(213 94% 40%)' : 'linear-gradient(135deg, hsl(213 94% 50%), hsl(199 89% 48%))',
                    boxShadow: loading ? '' : '0 0 30px hsl(213 94% 50% / 0.4)',
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
