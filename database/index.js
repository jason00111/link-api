const db = require('./setup')

function getContactsByUserId(userId) {
  const query = `
    SELECT contacts.* FROM users
    JOIN users_contacts ON users.id = users_contacts.user_id
    JOIN users AS contacts ON users_contacts.contact_id = contacts.id
    WHERE users.id = $1;`

  return db.any(query, userId)
}

async function deleteContactForUser(userId, contactId) {
  const query = `
    DELETE FROM users_contacts
    WHERE user_id = $(userId)
    AND contact_id = $(contactId);`

  const result = await db.result(query, { userId, contactId })

  return result.rowCount === 1
}

async function updateUser(userId, updatedValues) {
  const query = `
    UPDATE users
    SET full_name = $(full_name), phone = $(phone), email = $(email), blurb = $(blurb)
    WHERE id = $(userId)
    RETURNING *;`

  const updatedUser = await db.one(query, { userId, ...updatedValues })

  return updatedUser
}

async function addLinq(userId, contactId) {
  const query = `
    INSERT INTO users_contacts (user_id, contact_id)
    VALUES ($(userId), $(contactId)), ($(contactId), $(userId));`

  const result = await db.result(query, { userId, contactId })

  return result
}

module.exports = {
  getContactsByUserId,
  deleteContactForUser,
  updateUser,
  addLinq
}
