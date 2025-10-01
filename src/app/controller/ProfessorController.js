import ProfessorRepository from "../repositories/ProfessorRepository.js";

class ProfessorController {
  // 🔍 Listar todos os professores com disciplinas como array
  async index(req, res) {
    try {
      const professores = await ProfessorRepository.listarTodos();

      // Transforma campo 'disciplina' em array
      const formatados = professores.map(p => ({
        ...p,
        disciplinas: p.disciplina
  ? p.disciplina.split(',').map((d, i) => ({ id: i + 1, nome: d.trim() }))
  : []
      }));

      res.status(200).json(formatados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao buscar professores" });
    }
  }

  // 🔍 Buscar professor por ID
  async show(req, res) {
    const { id } = req.params;
    try {
      const professor = await ProfessorRepository.buscarPorId(id);
      if (!professor) return res.status(404).json({ msg: "Professor não encontrado" });

      // Formata disciplina como array
      const formatado = {
        ...professor,
        disciplinas: professor.disciplina
          ? professor.disciplina.split(',').map(d => ({ nome: d.trim() }))
          : []
      };

      res.status(200).json(formatado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao buscar professor" });
    }
  }

  // ➕ Criar novo professor
  async store(req, res) {
    const { nome, email, telefone, titulacao, disciplina } = req.body;

    if (!nome || !email || !disciplina) {
      return res.status(400).json({ 
        erro: "Campos obrigatórios: nome, email, disciplina" 
      });
    }

    try {
      const novoProfessor = await ProfessorRepository.criar({
        nome,
        email,
        telefone,
        titulacao,
        disciplina
      });

      // Formata disciplina como array
      const formatado = {
        ...novoProfessor,
        disciplinas: disciplina.split(',').map(d => ({ nome: d.trim() }))
      };

      res.status(201).json(formatado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao cadastrar professor" });
    }
  }

  // ✏️ Atualizar professor existente
  async update(req, res) {
    const { id } = req.params;
    const { nome, email, telefone, titulacao, disciplina } = req.body;

    if (!nome || !email || !disciplina) {
      return res.status(400).json({ 
        erro: "Campos obrigatórios: nome, email, disciplina" 
      });
    }

    try {
      const linhasAfetadas = await ProfessorRepository.atualizar(id, {
        nome,
        email,
        telefone,
        titulacao,
        disciplina
      });

      if (linhasAfetadas === 0) 
        return res.status(404).json({ msg: "Professor não encontrado" });

      // Formata disciplina como array
      const formatado = {
        id,
        nome,
        email,
        telefone,
        titulacao,
        disciplinas: disciplina.split(',').map(d => ({ nome: d.trim() }))
      };

      res.status(200).json(formatado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao atualizar professor" });
    }
  }

  // 🗑️ Deletar professor
  async delete(req, res) {
    const { id } = req.params;
    try {
      const linhasAfetadas = await ProfessorRepository.deletar(id);
      if (linhasAfetadas === 0) 
        return res.status(404).json({ msg: "Professor não encontrado" });

      res.status(200).json({ msg: `Professor ${id} excluído com sucesso!` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao excluir professor" });
    }
  }
}

export default new ProfessorController();
