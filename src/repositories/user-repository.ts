import pool from "../conexaoBd"

type TtoCreate = {
    nome: string
    email: string
    senha: string
}

export class UserRepository {
    async ToCreate(props: TtoCreate) {
        const result = await pool.query(
            'INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3) RETURNING id, nome, email',
            [props.nome, props.email, props.senha]
        )
        return result.rows[0]
    }

    async findByEmail(email: string) {
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
        return rows[0] || null
    }

    async findById(id: number) {
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id])
        return rows[0] || null
    }

    async list() {
        const { rows } = await pool.query('select * from materias')
        return rows
    }
}
