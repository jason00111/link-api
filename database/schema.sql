CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT UNIQUE,
  blurb VARCHAR(140)
);

CREATE TABLE users_contacts (
  user_id INT NOT NULL REFERENCES users,
  contact_id INT NOT NULL REFERENCES users,
  PRIMARY KEY (user_id, contact_id)
);
