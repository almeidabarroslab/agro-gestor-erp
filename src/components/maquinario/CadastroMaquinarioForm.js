import React, { useState, useEffect } from 'react';
import LucideIcon from '../ui/LucideIcon';

const CadastroMaquinarioForm = ({ onSave, onClose, maquinaEdit, updateMaquina }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [custoHora, setCustoHora] = useState('');

  useEffect(() => {
    if (maquinaEdit) {
      setNome(maquinaEdit.nome || '');
      setTipo(maquinaEdit.tipo || '');
      setMarca(maquinaEdit.marca || '');
      setModelo(maquinaEdit.modelo || '');
      setAno(maquinaEdit.ano || '');
      setCustoHora(maquinaEdit.custoHora || '');
    }
  }, [maquinaEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const maquinaData = { nome, tipo, marca, modelo, ano: Number(ano), custoHora: parseFloat(custoHora) };
    if (maquinaEdit) {
      updateMaquina(maquinaEdit.id, maquinaData);
    } else {
      onSave(maquinaData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-2xl space-y-6 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
        <LucideIcon name="Tractor" className="w-6 h-6 mr-2" />
        {maquinaEdit ? 'Editar Máquina' : 'Cadastrar Máquina'}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <input type="text" placeholder="Nome da Máquina (ex: Trator John Deere)" value={nome} onChange={(e) => setNome(e.target.value)} className="input" required />
        <input type="text" placeholder="Tipo (ex: Trator, Colheitadeira)" value={tipo} onChange={(e) => setTipo(e.target.value)} className="input" />
        <input type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} className="input" />
        <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} className="input" />
        <input type="number" placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} className="input" />
        <input type="number" step="0.01" placeholder="Custo por Hora (R$)" value={custoHora} onChange={(e) => setCustoHora(e.target.value)} className="input" required />
      </div>
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
        <button type="submit" className="btn-primary">Salvar</button>
      </div>
    </form>
  );
};

export default CadastroMaquinarioForm;
