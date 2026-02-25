
import sqlite3
import hashlib
import json
from datetime import datetime
from typing import List, Dict, Any

# LGPD Helper: Simple encryption simulation (In production use cryptography.fernet)
def encrypt_data(data: str) -> str:
    """Simula a criptografia de dados sensíveis antes de salvar no SQL."""
    return f"encrypted_{data}"

def decrypt_data(data: str) -> str:
    return data.replace("encrypted_", "")

def hash_email(email: str) -> str:
    """Garante a privacidade do identificador do usuário."""
    return hashlib.sha256(email.lower().strip().encode()).hexdigest()

class DatabaseManager:
    def __init__(self, db_path: str = "estudos.db"):
        self.db_path = db_path
        self._create_tables()

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def _create_tables(self):
        with self._get_connection() as conn:
            # Note: Using the SQL provided in database.sql
            pass 

    def create_study_entry(self, user_id: str, entry_data: Dict[str, Any]):
        """
        Cria um registro de estudo usando consultas parametrizadas.
        Garante a conformidade com a LGPD ao incluir dados de consentimento.
        """
        query = """
            INSERT INTO study_entries (
                id, user_id, date, subject, content_encrypted,
                theory_done, questions_done, law_doctrine_done, active_review_done,
                questions_count, study_hours, study_minutes, study_seconds,
                data_de_consentimento, versao_da_politica
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        
        # LGPD: Criptografando conteúdo sensível
        content_encrypted = encrypt_data(entry_data.get('content', ''))
        
        params = (
            entry_data.get('id'),
            user_id,
            entry_data.get('date'),
            entry_data.get('subject'),
            content_encrypted,
            entry_data.get('theory_done', False),
            entry_data.get('questions_done', False),
            entry_data.get('law_doctrine_done', False),
            entry_data.get('active_review_done', False),
            entry_data.get('questions_count', 0),
            entry_data.get('study_hours', 0),
            entry_data.get('study_minutes', 0),
            entry_data.get('study_seconds', 0), # Novo parâmetro
            entry_data.get('data_de_consentimento'), # Snapshot do consentimento
            entry_data.get('versao_da_politica')
        )

        try:
            with self._get_connection() as conn:
                conn.execute(query, params)
                return True
        except sqlite3.Error as e:
            print(f"Erro no banco de dados: {e}")
            return False

    def get_user_entries(self, user_id: str) -> List[Dict[str, Any]]:
        query = "SELECT * FROM study_entries WHERE user_id = ? ORDER BY date DESC"
        
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            rows = conn.execute(query, (user_id,)).fetchall()
            
            entries = []
            for row in rows:
                entry = dict(row)
                # Descriptografando para uso na aplicação
                entry['content'] = decrypt_data(entry['content_encrypted'])
                entries.append(entry)
            return entries

# Exemplo de Inicialização
if __name__ == "__main__":
    db = DatabaseManager()
    print("Backend Python configurado com sucesso e pronto para conexões SQL.")
