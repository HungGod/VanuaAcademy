import { ViberIcon, WhatsAppIcon, SmsIcon, EmailIcon } from './icons';

const contactMethods = [
    { 
      value: 'Viber', 
      label: 'Viber', 
      icon: ViberIcon
    },
    { 
      value: 'WhatsApp', 
      label: 'WhatsApp', 
      icon: WhatsAppIcon
    },
    { 
      value: 'SMS/Text', 
      label: 'SMS/Text', 
      icon: SmsIcon
    },
    { 
      value: 'Email', 
      label: 'Email', 
      icon: EmailIcon
    }
  ];

const emailMethods = [ 'Email' ];

const phoneMethods = [ 'Viber', 'WhatsApp', 'SMS/Text' ];

export { contactMethods, emailMethods, phoneMethods };