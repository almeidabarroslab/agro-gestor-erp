import React, { useState } from 'react';
import { simularGeracaoDescricaoVagaIA } from '../../services/gemini';
import FormWrapper from '../ui/FormWrapper';
import FormInput from '../ui/FormInput';
import FormSelect from '../ui/FormSelect';
import Button from '../ui/Button';

const CadastroRHForm = ({ onClose, addMembro, membroEdit, updateMembro }) => {
  const [nome, setNome] = useState(membroEdit ? membroEdit.nome : "");
  const [funcao, setFuncao] = useState(
    membroEdit ? membroEdit.funcao : "Colhedor"
  );
  const [custoHora, setCustoHora] = useState(
    membroEdit ? membroEdit.custoHora : 15.0
  );
  const [status, setStatus] = useState(
    membroEdit ? membroEdit.status : "Ativo"
  );
  const [contato, setContato] = useState(membroEdit ? membroEdit.contato : "");
  const [isLoading, setIsLoading] = useState(false);

  const [descricaoVagaIA, setDescricaoVagaIA] = useState("");
  const [isLoadingIA, setIsLoadingIA] = useState(false);

  const handleGerarDescricao = async (e) => {
    e.preventDefault();
    if (!funcao || !custoHora) {
      setDescricaoVagaIA(
        "Preencha a Função e o Custo/Hora para gerar a descrição."
      );
      return;
    }

    setIsLoadingIA(true);
    setDescricaoVagaIA("");

    try {
      const result = await simularGeracaoDescricaoVagaIA(
        funcao,
        parseFloat(custoHora)
      );
      setDescricaoVagaIA(result.text);
    } catch (error) {
      setDescricaoVagaIA("Falha ao gerar a descrição da vaga pela IA.");
    } finally {
      setIsLoadingIA(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dadosMembro = {
      nome,
      funcao,
      custoHora: parseFloat(custoHora),
      status,
      contato,
    };

    try {
      if (membroEdit) {
        await updateMembro(membroEdit.id, dadosMembro);
      } else {
        await addMembro(dadosMembro);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar membro:", error);
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper
      title={membroEdit ? "Editar Membro da Equipe" : "Novo Membro da Equipe"}
      onSubmit={handleSubmit}
      onCancel={onClose}
      submitLabel={membroEdit ? "Atualizar Membro" : "Adicionar Membro"}
      isLoading={isLoading}
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Nome Completo"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          placeholder="Nome do colaborador"
        />
        <FormInput
          label="Contato (Telefone/Email)"
          id="contato"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          placeholder="(00) 00000-0000"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <FormSelect
          label="Função"
          id="funcao"
          value={funcao}
          onChange={(e) => setFuncao(e.target.value)}
          options={["Colhedor", "Tratorista", "Agrônomo", "Administrativo", "Geral"]}
          required
        />
        <FormInput
          label="Custo/Hora (R$)"
          id="custoHora"
          type="number"
          value={custoHora}
          onChange={(e) => setCustoHora(e.target.value)}
          step="0.01"
          min="0"
          required
        />
        <FormSelect
          label="Status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={["Ativo", "Licença", "Inativo"]}
          required
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="primary"
          onClick={handleGerarDescricao}
          disabled={isLoadingIA || !funcao || parseFloat(custoHora) <= 0}
          loading={isLoadingIA}
          icon="Bot"
        >
          {isLoadingIA ? "Gerando..." : "✨ Gerar Descrição de Vaga (IA)"}
        </Button>
      </div>

      {descricaoVagaIA && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-xl shadow-inner max-h-64 overflow-y-auto">
          <h3 className="text-md font-bold text-blue-800 mb-2">
            Descrição Gerada:
          </h3>
          <div className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
            {descricaoVagaIA}
          </div>
        </div>
      )}
    </FormWrapper>
  );
};

export default CadastroRHForm;
