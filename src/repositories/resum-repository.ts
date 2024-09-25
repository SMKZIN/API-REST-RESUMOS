import pool from "../conexaoBd"
import TResumo from "../types/TResumo"

export class ResumRepository {
    async toCreate(props: TResumo) {
        const { rows } = await pool.query(
            'INSERT INTO resumos (usuario_id, materia_id, topicos, descricao, criado , titulo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [props.usuarioId, props.materiaId, props.topicos, props.descricao, props.criado, props.titulo]
        )

        const resultado = rows[0]

        return {
            id: resultado.id,
            usuarioId: resultado.usuario_id,
            materiaId: resultado.materia_id,
            titulo: resultado.titulo,
            topicos: resultado.topicos.split(", "),
            descricao: resultado.descricao,
            criado: resultado.criado,
        }
    }

    async findBIdMatery(id: number) {
        const { rows } = await pool.query('SELECT * FROM materias WHERE id = $1', [id])
        return rows[0] || null
    }

    async listAllResum(usuarioId: number) {
        try {
            const { rows } = await pool.query('SELECT resumos.*, materias.nome AS materia FROM resumos JOIN materias ON resumos.materia_id = materias.id WHERE resumos.usuario_id = $1',[usuarioId])
            return rows.map(resumo => ({
                id: resumo.id,
                usuarioId: resumo.usuario_id,
                titulo: resumo.titulo, 
                materia: resumo.materia,
                topicos: resumo.topicos.split(", "),
                descricao: resumo.descricao,
                criado: resumo.criado,
            }));
        } catch (error) {
            console.error('Erro ao listar resumos:', error)
            throw new Error('Erro ao listar resumos')
        }
    }

    async FilterResum(usuarioId: number, materia: string) {

        const { rows } = await pool.query('SELECT * FROM resumos WHERE usuario_id = $1 AND materia = $2',
            [usuarioId, materia])

        return rows
    }

}
