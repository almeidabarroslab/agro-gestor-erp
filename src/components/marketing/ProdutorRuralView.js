import React from 'react';
import LucideIcon from '../ui/LucideIcon';

const ProdutorRuralView = () => {
  const features = [
    { name: 'Planejamento de Safra', description: 'Organize seus cultivos, estime custos e preveja a lucratividade.', icon: 'Calendar' },
    { name: 'Manejo de Pragas e Doenças', description: 'Monitore e controle pragas e doenças com recomendações inteligentes.', icon: 'Bug' },
    { name: 'Gestão de Maquinário', description: 'Controle o uso, manutenção e custos do seu maquinário agrícola.', icon: 'Tractor' },
    { name: 'Controle de Estoque', description: 'Gerencie seus insumos, sementes e produtos colhidos em tempo real.', icon: 'Warehouse' },
    { name: 'Análise de Rentabilidade', description: 'Visualize relatórios detalhados sobre a rentabilidade de cada cultura.', icon: 'BarChart3' },
    { name: 'Gestão Financeira Completa', description: 'Controle contas a pagar e a receber, fluxo de caixa e faturamento.', icon: 'DollarSign' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Software para o Produtor Rural Moderno</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">Otimize sua produção, reduza custos e aumente a lucratividade com uma gestão agrícola completa e integrada.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Solicitar Demonstração</a>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">Conheça as Funcionalidades <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-teal-600">Tudo em um só lugar</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A solução completa para a gestão da sua fazenda</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">Desde o plantio até a colheita e venda, o AgroGestor centraliza todas as operações para você tomar as melhores decisões.</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                      <LucideIcon name={feature.icon} className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-800">
        <div className="mx-auto max-w-7xl py-12 px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Transforme a gestão da sua fazenda.</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">Descubra como o AgroGestor pode ajudar você a alcançar novos patamares de eficiência e rentabilidade.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Comece Agora</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutorRuralView;
