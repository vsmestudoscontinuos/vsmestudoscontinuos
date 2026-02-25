
-- Script de Criação do Banco de Dados Estudos Contínuos
-- Compatível com SQLite, PostgreSQL ou MySQL

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email_hash VARCHAR(255) NOT NULL UNIQUE, -- LGPD: E-mail armazenado como hash para anonimização se necessário
    full_name_encrypted TEXT,                -- LGPD: Dados pessoais criptografados
    password_hash VARCHAR(255) NOT NULL,
    trial_accepted BOOLEAN DEFAULT FALSE,
    trial_end_date TIMESTAMP,
    is_premium BOOLEAN DEFAULT FALSE,
    premium_expires_at TIMESTAMP,
    data_de_consentimento TIMESTAMP NOT NULL, -- LGPD Requirement
    versao_da_politica VARCHAR(10) NOT NULL,  -- LGPD Requirement
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE study_entries (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content_encrypted TEXT,                   -- LGPD: Conteúdo do estudo pode conter dados sensíveis
    theory_done BOOLEAN DEFAULT FALSE,
    questions_done BOOLEAN DEFAULT FALSE,
    law_doctrine_done BOOLEAN DEFAULT FALSE,
    active_review_done BOOLEAN DEFAULT FALSE,
    questions_count INTEGER DEFAULT 0,
    study_hours INTEGER DEFAULT 0,
    study_minutes INTEGER DEFAULT 0,
    study_seconds INTEGER DEFAULT 0,          -- Nova coluna para precisão de tempo
    data_de_consentimento TIMESTAMP,          -- Snapshot do consentimento no momento do registro
    versao_da_politica VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Índices para performance
CREATE INDEX idx_study_user_date ON study_entries(user_id, date);
