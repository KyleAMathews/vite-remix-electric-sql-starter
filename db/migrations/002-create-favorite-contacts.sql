CREATE TABLE IF NOT EXISTS favorite_contacts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    contact_id UUID NOT NULL,
    FOREIGN KEY (contact_id) REFERENCES contacts(id)
);
