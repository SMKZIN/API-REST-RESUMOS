create database resume_ai;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,  
    nome text NOT NULL,          
    email text NOT NULL UNIQUE,  
    senha text NOT NULL          
);


CREATE TABLE "resumos" (
  "id" serial NOT NULL,
  "usuario_id" int4 NOT NULL,
  "materia_id" int4 NOT NULL,
  "materia" varchar(100)NOT NULL,
  "topicos" text NOT NULL,
  "descricao" text NOT NULL,
  "criado" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id", "usuario_id", "materia_id"),
);

CREATE TABLE "materias" (
  "id" serial NOT NULL,
  "nome" text NOT NULL,
  PRIMARY KEY ("id")
);

insert into materias(nome)
values('Back-end'), ('Front-end'), ('Carreira'), ('Mobile'), ('Design'), ('Dados'), ('SQL');

select * from materias;

select * from usuarios where email = 'sla@email.com'

insert into usuarios(nome, email, senha)
values ('', '', '')

INSERT INTO resumos (titulo, conteudo, usuario_id, materia_id, data_criacao) 
VALUES ('', '', '', '', '');

Crie o comando para listar os resumos que correspondem a um determinado usuário
SELECT * FROM resumos WHERE usuario_id = 1;

WHERE usuario_id = 1 AND materia_id = 2;

SELECT * FROM resumos 
WHERE id = 10 AND usuario_id = 1;

UPDATE resumos 
SET titulo = '', conteudo = '', materia_id = 57, data_atualizacao = NOW() 
WHERE id = 11 AND usuario_id = 2;

DELETE FROM resumos 
WHERE id = 11 AND usuario_id = 2;

SELECT COUNT(*) AS total_resumos 
FROM resumos 
WHERE EXTRACT(YEAR FROM data_criacao) = 2012
AND EXTRACT(MONTH FROM data_criacao) = 6;
