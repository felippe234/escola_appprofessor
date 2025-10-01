// src/app/repositories/ProfessorRepository.js
import conexao from "../database/conexao.js";

class ProfessorRepository {
  // Listar todos os professores
  async listarTodos() {
    const [rows] = await conexao.execute("SELECT * FROM Professor");
    return rows;
  }

  // Buscar professor por ID
  async buscarPorId(id) {
    const [rows] = await conexao.execute(
      "SELECT * FROM Professor WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  // Criar professor
  async criar(professor) {
    const [result] = await conexao.execute(
      `INSERT INTO Professor (nome, email, telefone, titulacao, disciplina) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        professor.nome,
        professor.email,
        professor.telefone,
        professor.titulacao,
        professor.disciplina
      ]
    );

    // Retorna o professor com o ID gerado pelo MySQL
    return { id: result.insertId, ...professor };
  }

  // Atualizar professor
  async atualizar(id, professor) {
    const [result] = await conexao.execute(
      `UPDATE Professor 
       SET nome = ?, email = ?, telefone = ?, titulacao = ?, disciplina = ? 
       WHERE id = ?`,
      [
        professor.nome,
        professor.email,
        professor.telefone,
        professor.titulacao,
        professor.disciplina,
        id
      ]
    );
    return result.affectedRows;
  }

  // Deletar professor
  async deletar(id) {
    const [result] = await conexao.execute(
      "DELETE FROM Professor WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }
}

export default new ProfessorRepository();
