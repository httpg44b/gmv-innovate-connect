import React, { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: t('contact.form.success'),
      variant: 'default',
    });
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-dark text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-xl opacity-80">{t('contact.subtitle')}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-primary-foreground">{t('contact.form.name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="bg-background/95 dark:bg-background/80 border-primary-foreground/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-primary-foreground">{t('contact.form.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-background/95 dark:bg-background/80 border-primary-foreground/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="company" className="text-primary-foreground">{t('contact.form.company')}</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="bg-background/95 dark:bg-background/80 border-primary-foreground/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-primary-foreground">{t('contact.form.message')}</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows={5}
                className="bg-background/95 dark:bg-background/80 border-primary-foreground/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            <Button type="submit" size="lg" className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/90">
              {t('contact.form.submit')}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <a href="mailto:contato@gmvsolution.fr" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground">
              <Mail className="w-5 h-5" />
              {t('contact.email')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;