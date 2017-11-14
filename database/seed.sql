INSERT INTO users (full_name, phone, email, blurb)
VALUES (
  'Zeus Alkyone',
  '999-515-6464',
  'zeus@gmail.com',
  'Gender: Masculine
Type: Adult
Nationality: Greek
Location: Greece
Language: Greek'
),
(
  'Ariadne Dionysos',
  '111-111-1111',
  'ariadne@gmail.com',
  'Gender: Feminine
Type: Elderly Adult
Nationality: Greek
Location: Greece
Language: Greek'
);

INSERT INTO users_contacts (user_id, contact_id)
VALUES (1, 2), (2, 1);
