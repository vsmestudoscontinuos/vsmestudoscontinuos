
import React from 'react';
import { ArrowLeft, Shield, FileText, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Legal: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-lg text-slate-800">Documentos Legais</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-12">
        {/* Política de Privacidade */}
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <Shield className="w-6 h-6" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Política de Privacidade</h2>
          </div>
          
          <div className="prose prose-slate prose-sm max-w-none space-y-4 text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-800">Última atualização: 23 de fevereiro de 2026</p>
            
            <p>
              O <strong>VSM Study Guide</strong> valoriza a sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos e protegemos seus dados pessoais em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)</strong>.
            </p>

            <h3 className="text-lg font-bold text-slate-800 mt-6">1. Dados Coletados</h3>
            <p>Coletamos os seguintes dados para o funcionamento do aplicativo:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Identificação:</strong> Nome e E-mail.</li>
              <li><strong>Perfil:</strong> Foto de perfil (opcional).</li>
              <li><strong>Atividade:</strong> Dados de progresso de estudo, cronogramas e registros de produtividade.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mt-6">2. Finalidade do Tratamento</h3>
            <p>Seus dados são utilizados exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Personalizar seu cronograma de estudos.</li>
              <li>Sincronizar seus dados na nuvem para acesso em múltiplos dispositivos.</li>
              <li>Garantir a segurança da sua conta e recuperação de acesso.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mt-6">3. Armazenamento e Segurança</h3>
            <p>
              Os dados são armazenados em servidores de alta segurança (como Firebase/AWS). Implementamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados. <strong>Não vendemos seus dados a terceiros em nenhuma hipótese.</strong>
            </p>

            <h3 className="text-lg font-bold text-slate-800 mt-6">4. Seus Direitos (Art. 18 da LGPD)</h3>
            <p>Você possui o direito de, a qualquer momento:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirmar a existência de tratamento de dados.</li>
              <li>Acessar seus dados.</li>
              <li>Corrigir dados incompletos ou inexatos.</li>
              <li><strong>Solicitar a exclusão definitiva de seus dados</strong> através das configurações do aplicativo.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mt-6">5. Contato</h3>
            <p>
              Para dúvidas sobre privacidade, entre em contato com nosso Encarregado de Dados pelo e-mail: <br />
              <a href="mailto:suporte.estudoscontinuos@gmail.com" className="text-blue-600 font-bold">suporte.estudoscontinuos@gmail.com</a>
            </p>
          </div>
        </section>

        {/* Termos de Uso */}
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 text-indigo-600">
            <FileText className="w-6 h-6" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Termos de Uso</h2>
          </div>

          <div className="prose prose-slate prose-sm max-w-none space-y-4 text-slate-600 leading-relaxed">
            <h3 className="text-lg font-bold text-slate-800">1. Aceitação dos Termos</h3>
            <p>
              Ao utilizar o VSM Study Guide, você concorda integralmente com estes termos. Este aplicativo é destinado a estudantes que buscam organização e produtividade acadêmica.
            </p>

            <h3 className="text-lg font-bold text-slate-800 mt-6">2. Uso do Serviço</h3>
            <p>
              O usuário compromete-se a fornecer informações verídicas e a utilizar o aplicativo de forma lícita, respeitando os direitos de propriedade intelectual da plataforma.
            </p>

            <h3 className="text-lg font-bold text-slate-800 mt-6">3. Responsabilidades</h3>
            <p>
              O VSM Study Guide é uma ferramenta de auxílio. O desempenho acadêmico e o cumprimento de prazos externos são de responsabilidade exclusiva do estudante. Não nos responsabilizamos por perdas de dados decorrentes de mau uso ou falhas de conexão do usuário.
            </p>

            <h3 className="text-lg font-bold text-slate-800 mt-6">4. Modificações</h3>
            <p>
              Podemos atualizar estes termos periodicamente. O uso continuado do app após alterações constitui aceitação dos novos termos.
            </p>
          </div>
        </section>

        <div className="bg-blue-600 rounded-[32px] p-8 text-white flex items-center gap-6">
          <div className="bg-white/20 p-4 rounded-2xl">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-bold text-xl">Compromisso LGPD</h4>
            <p className="text-blue-100 text-sm mt-1">
              Nossa plataforma foi construída seguindo os princípios de Privacy by Design e Privacy by Default.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Legal;
