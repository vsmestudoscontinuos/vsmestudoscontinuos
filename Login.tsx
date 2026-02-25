
import React from 'react';
import { Mail, ArrowLeft, ShieldCheck, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const handleDeleteAccount = () => {
    if (window.confirm("ATENÇÃO: Esta ação excluirá permanentemente sua conta e todos os seus dados de estudo, conforme garantido pelo Art. 18 da LGPD. Deseja continuar?")) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
       <header className="p-4 flex items-center justify-between border-b border-slate-50">
          <Link to="/" className="text-slate-800 font-bold flex items-center gap-1">
             <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          <h1 className="font-bold text-lg">Configurações e Suporte</h1>
          <div className="w-10" />
       </header>

       <main className="max-w-2xl mx-auto px-6 py-10 space-y-10">
          <div className="text-center space-y-2">
             <h2 className="text-3xl font-black text-slate-800">Precisa de Ajuda?</h2>
             <p className="text-slate-500 font-medium">Entre em contato conosco ou gerencie sua privacidade</p>
          </div>

          {/* Seção de Privacidade */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-6">
             <div className="flex items-center gap-3 text-slate-800">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-xl">Privacidade e Dados</h3>
             </div>
             
             <p className="text-sm text-slate-500 leading-relaxed">
                Você tem total controle sobre seus dados. Acesse nossa <Link to="/legal" className="text-blue-600 font-bold underline">Política de Privacidade</Link> para entender como protegemos suas informações.
             </p>

             <button 
                onClick={handleDeleteAccount}
                className="w-full bg-white border-2 border-red-100 text-red-500 py-4 rounded-2xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"
             >
                <Trash2 className="w-5 h-5" />
                Excluir Conta e Dados Definitivamente (LGPD - Art. 18)
             </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl space-y-6">
             <h3 className="text-xl font-bold text-slate-800 mb-2">Informações de Contato</h3>
             <p className="text-sm text-slate-500 mb-6">
               Para dúvidas, sugestões ou suporte técnico, envie-nos um e-mail. Nossa equipe responderá o mais breve possível.
             </p>
             <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <Mail className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Suporte</div>
                      <a href="mailto:suporte.estudoscontinuos@gmail.com" className="font-black text-blue-600 hover:text-blue-700 hover:underline transition-all text-lg">suporte.estudoscontinuos@gmail.com</a>
                   </div>
                </div>
             </div>
          </div>
       </main>
    </div>
  );
};

export default Contact;
