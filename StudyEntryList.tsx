
import React, { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  onAccept: () => void;
}

const PrivacyConsentModal: React.FC<Props> = ({ onAccept }) => {
  const [consented, setConsented] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Sua Privacidade</h2>
            <p className="text-slate-500 text-sm">Conformidade com a LGPD</p>
          </div>
        </div>

        <div className="space-y-4 text-slate-600 mb-8">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm">
              Solicitamos seu e-mail exclusivamente para garantir a sincronização segura dos seus dados entre dispositivos e para a recuperação da sua conta, caso necessário.
            </p>
          </div>

          <div className="text-sm leading-relaxed">
            <p>Ao clicar em "Aceitar", você concorda com:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Personalização do cronograma de estudos.</li>
              <li>Sincronização de dados na nuvem (Firebase/AWS).</li>
              <li>Armazenamento seguro de registros acadêmicos.</li>
            </ul>
          </div>

          <label className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl cursor-pointer hover:bg-blue-100 transition-all border border-blue-100">
            <input 
              type="checkbox" 
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-blue-900">
              Li e concordo com os <Link to="/legal" className="underline font-bold">Termos de Uso</Link> e a <Link to="/legal" className="underline font-bold">Política de Privacidade</Link> do VSM Study Guide.
            </span>
          </label>
        </div>

        <button
          disabled={!consented}
          onClick={onAccept}
          className={`w-full py-4 rounded-2xl font-bold transition-all ${
            consented 
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Confirmar Consentimento
        </button>
      </div>
    </div>
  );
};

export default PrivacyConsentModal;
