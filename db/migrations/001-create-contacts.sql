CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    website TEXT,
    avatar TEXT,
    notes TEXT
);

ALTER TABLE contacts ENABLE ELECTRIC;
