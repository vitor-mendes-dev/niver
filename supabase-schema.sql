-- Tabela para armazenar as confirmações de presença (RSVPs)
CREATE TABLE rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guests INTEGER DEFAULT 0,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela para armazenar os presentes escolhidos
CREATE TABLE reserved_gifts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gift_id TEXT NOT NULL,
  reserved_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(gift_id)
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE reserved_gifts ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso: Permitir leitura e escrita para todos (público)
CREATE POLICY "Allow public read access" ON rsvps FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON rsvps FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON rsvps FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON reserved_gifts FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON reserved_gifts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete" ON reserved_gifts FOR DELETE USING (true);

-- Criar índices para melhorar performance
CREATE INDEX idx_rsvps_created_at ON rsvps(created_at DESC);
CREATE INDEX idx_reserved_gifts_gift_id ON reserved_gifts(gift_id);
