
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSelector = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const getLanguageFlag = (code: string) => {
    return <Flag className="h-4 w-4 mr-2" />;
  };
  
  const getLanguageName = (code: string) => {
    const lang = availableLanguages.find(l => l.code === code);
    return lang ? lang.name : code.toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1 rounded-full px-2 py-1.5 text-sm text-foreground hover:bg-accent transition-all duration-300"
        >
          {getLanguageFlag(language)}
          <span className="hidden sm:inline">{getLanguageName(language)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px] p-1 animate-fadeIn">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${
              language === lang.code ? 'bg-accent/50 font-medium' : ''
            }`}
            onClick={() => setLanguage(lang.code)}
          >
            {getLanguageFlag(lang.code)}
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
