import React from 'react';
import PlantacaoCard from './PlantacaoCard';
import ViewLayout, { EmptyState } from '../ui/ViewLayout';
import { CardGrid } from '../ui/Card';

const PlantacoesView = ({ plantacoes, isLoading, error, openModal }) => {
  return (
    <ViewLayout
      title="Gestão de Plantações"
      icon="Leaf"
      onAddNew={() => openModal("cadastro_plantacao")}
      addButtonLabel="Nova Plantação"
      isLoading={isLoading}
      error={error}
    >
      {plantacoes.length === 0 ? (
        <EmptyState
          message="Nenhuma plantação cadastrada ainda."
          onAction={() => openModal("cadastro_plantacao")}
          actionLabel="Comece cadastrando sua primeira área!"
          icon="Leaf"
        />
      ) : (
        <CardGrid columns="auto">
          {plantacoes.map((p) => (
            <PlantacaoCard
              key={p.id}
              plantacao={p}
              onEdit={() => openModal("cadastro_plantacao", p)}
              onTrack={() => openModal("crescimento", p)}
              onYield={() => openModal("rendimento", p)}
              onDetails={() => openModal("detalhes", p)}
              onApplyInsumo={() => openModal("aplicacao_insumo", p)}
              onPlanResources={() => openModal("plano_recursos", p)}
            />
          ))}
        </CardGrid>
      )}
    </ViewLayout>
  );
};

export default PlantacoesView;