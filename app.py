from flask import Flask, request, jsonify, render_template
import sqlalchemy, pandas as pd
from flask_cors import CORS
from unidecode import unidecode

app = Flask(__name__)
CORS(app)



DB_USER = 'root'
DB_PASSWORD = 'SenhaLonga!123'
DB_HOST = 'filadeatendimento-mysql-1'
DB_NAME = 'hexag_filas'
engine = sqlalchemy.create_engine(f'mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}?charset=utf8mb4')

@app.route('/')
def index():
    return render_template('fila_aluno.html')

@app.route('/plantonista')
def plantonista():
    return render_template('fila_plantonista.html')

@app.route('/fila')
def mostra_fila():
    return render_template('fila_fila.html')


@app.route('/getSetores', methods=['GET'])
def getSetores():
    with engine.begin() as conn:
        df = pd.read_sql(sql='CALL getSetores();', con=conn).to_json(force_ascii=False, index=False)
        df = unidecode(df)
    return df

@app.route('/inserirNomeEspera', methods=['POST'])
def inserirNomeEspera():
    nome = request.json.get('nome')
    id_setor = request.json.get('id') #validar as coisa e tal
    nome = unidecode(nome)
    with engine.begin() as conn:
        conn.execute(sqlalchemy.text(f'CALL inserirNomeEspera(:nome, :id_setor);').bindparams(nome=nome, id_setor=id_setor))
    return jsonify({'message': f'{nome} adicionado à fila!'})


@app.route('/iniciarAtendimento', methods=['POST'])
def iniciarAtendimento():
    id = request.json.get('id') #validar as coisa e tal
    with engine.begin() as conn:
        conn.execute(sqlalchemy.text(f'CALL iniciarAtendimento(:id);').bindparams(id=id))
    return jsonify({'message': f'Atendimento {id} iniciado!'})

@app.route('/finalizarAtendimento', methods=['POST'])
def finalizarAtendimento():
    id = request.json.get('id') #validar as coisa e tal
    with engine.begin() as conn:
        conn.execute(sqlalchemy.text(f'CALL finalizarAtendimento(:id);').bindparams(id=id))
    return jsonify({'message': f'Atendimento {id} finalizado!'})

@app.route('/limparFilaEspera', methods=['POST'])
def limpa_fila_espera():
    with engine.begin() as conn:
        conn.execute(sqlalchemy.text("CALL limpaFilaEspera();")) 
    return jsonify({'message': f'Registros da fila de espera finalizados!'})


@app.route('/capturarAluno', methods=['POST'])
def capturarAluno():
    id = request.json.get('id') #validar as coisa e tal
    plantonista = request.json.get('plantonista')
    plantonista = unidecode(plantonista)
    aluno = request.json.get('aluno')
    aluno = unidecode(aluno)
    with engine.begin() as conn:
        conn.execute(sqlalchemy.text("CALL capturarAluno(:id, :plantonista);").bindparams(plantonista=plantonista, id=id)) 
    return jsonify({'message': f'{aluno} capturado por {plantonista}!'})

@app.route('/limparFilaAtendimento', methods=['POST'])
def limparFilaAtendimento():
    with engine.begin() as conn:
        conn.execute(sqlalchemy.text("CALL limpaFilaAtendimento();")) 
    return jsonify({'message': f'Registros da fila de atendimento finalizados!'})

@app.route('/filaEspera', methods=['POST'])
def filaEspera():
    s_id = request.json.get('id')
    with engine.begin() as conn:
        df = pd.read_sql(sql=f'CALL getFilaEspera({s_id});', con=conn).to_json(force_ascii=False, index=False)
        df = unidecode(df)
    return df

@app.route('/filaAtendimento', methods=['POST'])
def filaAtendimento():
    s_id = request.json.get('id')
    with engine.begin() as conn:
        df = pd.read_sql(sql=f'CALL getFilaAtendimento({s_id});', con=conn).to_json(force_ascii=False, index=False)
        df = unidecode(df)
    return df


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')