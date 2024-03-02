CREATE DATABASE hexag_filas;
USE hexag_filas;


GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'SenhaLonga!123';


CREATE TABLE setores (
    s_id INT AUTO_INCREMENT PRIMARY KEY,
    s_nome VARCHAR(100),
    s_ativo BOOLEAN DEFAULT 1

);
INSERT INTO setores (
    s_nome
)
VALUES (
    'GERAL'
), 
('NAO GERAL');


CREATE TABLE fila_espera (
                    fe_id INT AUTO_INCREMENT PRIMARY KEY,
                    fe_aluno varchar(100),
                    fe_atendido BOOLEAN DEFAULT 0,
                    s_id INT NOT NULL,
                    fe_dthora DATETIME  DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (s_id) REFERENCES setores(s_id)
                                       
                    );
INSERT INTO fila_espera (                  
                    fe_aluno,
                    s_id
)
VALUES (
    'Alexandre Zuchetti', 1
);

CREATE TABLE fila_atendimento (
                    fa_id INT AUTO_INCREMENT PRIMARY KEY,
                    fa_aluno varchar(100),
                    s_id INT NOT NULL,
                    fa_plantonista varchar(100) NOT NULL,
                    fa_ematendimento BOOLEAN DEFAULT 0,
                    fa_finalizado BOOLEAN DEFAULT 0,
                    fa_dthr DATETIME  DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (s_id) REFERENCES setores(s_id)
                    );
INSERT INTO fila_atendimento (                  
                    fa_aluno,
                    s_id,
                    fa_plantonista
)
VALUES (
    'Maria Seiladasquantas', 2, 'plantonista legal'
);




DELIMITER //

CREATE PROCEDURE getSetores()
BEGIN
    SELECT s_id, s_nome FROM setores
    WHERE s_ativo = 1;
END//

CREATE PROCEDURE getFilaEspera(IN id INT)
BEGIN
    SELECT fe_id, fe_aluno FROM fila_espera
    WHERE fe_atendido = 0
    AND DATE(fe_dthora) = CURDATE()
    AND s_id = id;
END//





CREATE PROCEDURE getFilaAtendimento(IN id INT)
BEGIN
    SELECT fa_id, fa_aluno, fa_plantonista, fa_ematendimento FROM fila_atendimento
    WHERE fa_finalizado = 0
    AND DATE(fa_dthr) = CURDATE()
    AND s_id = id;
END//



CREATE PROCEDURE capturarAluno(IN id INT, IN plantonista varchar(100))
BEGIN
    DECLARE aluno varchar(100);
    DECLARE setor varchar(100);


    UPDATE fila_espera 
    SET fe_atendido = 1
    WHERE fe_id = id;

    
    SELECT fe_aluno, s_id INTO aluno, setor
    FROM fila_espera
    WHERE fe_id = id;

    INSERT INTO fila_atendimento (fa_aluno, fa_plantonista, s_id)
    VALUES (aluno, plantonista, setor);
    
END//

CREATE PROCEDURE iniciarAtendimento(IN id INT)
BEGIN

    UPDATE fila_atendimento 
    SET fa_ematendimento = 1
    WHERE fa_id = id;
    
END//

CREATE PROCEDURE finalizarAtendimento(IN id INT)
BEGIN

    UPDATE fila_atendimento 
    SET fa_finalizado = 1
    WHERE fa_id = id;
    
END//



CREATE PROCEDURE inserirNomeEspera(IN nome varchar(100), IN setor INT)
BEGIN
    INSERT INTO fila_espera (fe_aluno, s_id) VALUES (nome, setor);
END//



CREATE PROCEDURE limpaFilaEspera()
BEGIN
    update fila_espera
    set fe_atendido = 1;
END//




CREATE PROCEDURE limpaFilaAtendimento()
BEGIN
    update fila_atendimento
    set fa_finalizado = 1;
END//

DELIMITER ;

