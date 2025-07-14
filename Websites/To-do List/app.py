from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('tareas.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tareas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contenido TEXT NOT NULL,
            fecha TEXT,
            completado INTEGER DEFAULT 0,
            fijado INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    conn = sqlite3.connect('tareas.db')
    cursor = conn.cursor()

    # Obtener tareas activas, ordenadas por fijado DESC, fecha ASC
    cursor.execute('''
        SELECT id, contenido, fecha, completado, fijado
        FROM tareas
        WHERE completado = 0
        ORDER BY fijado DESC, fecha ASC
    ''')
    activas = cursor.fetchall()

    # Tareas completadas
    cursor.execute('''
        SELECT id, contenido, fecha
        FROM tareas
        WHERE completado = 1
        ORDER BY fecha ASC
    ''')
    realizadas = cursor.fetchall()

    conn.close()
    return render_template('index.html', activas=activas, realizadas=realizadas)

@app.route('/agregar', methods=['POST'])
def agregar():
    contenido = request.form['contenido']
    fecha = request.form['fecha']
    conn = sqlite3.connect('tareas.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO tareas (contenido, fecha) VALUES (?, ?)', (contenido, fecha))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

@app.route('/completar', methods=['POST'])
def completar():
    tarea_id = request.form['id']
    conn = sqlite3.connect('tareas.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE tareas SET completado = 1 WHERE id = ?', (tarea_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

@app.route('/fijar', methods=['POST'])
def fijar():
    tarea_id = request.form['id']
    conn = sqlite3.connect('tareas.db')
    cursor = conn.cursor()
    # Alternar estado
    cursor.execute('SELECT fijado FROM tareas WHERE id = ?', (tarea_id,))
    estado = cursor.fetchone()[0]
    nuevo_estado = 0 if estado else 1
    cursor.execute('UPDATE tareas SET fijado = ? WHERE id = ?', (nuevo_estado, tarea_id))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

@app.route('/editar/<int:id>')
def editar(id):
    conn = sqlite3.connect('tareas.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, contenido, fecha FROM tareas WHERE id = ?', (id,))
    tarea = cursor.fetchone()
    conn.close()
    return render_template('editar.html', tarea=tarea)

@app.route('/actualizar/<int:id>', methods=['POST'])
def actualizar(id):
    contenido = request.form['contenido']
    fecha = request.form['fecha']
    conn = sqlite3.connect('tareas.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE tareas SET contenido = ?, fecha = ? WHERE id = ?', (contenido, fecha, id))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
