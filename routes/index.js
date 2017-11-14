const router = require('express').Router()
const bodyParser = require('body-parser')
const db = require('../database')

router.use(bodyParser.json())

router.get('/:userId/contacts', async (req, res) => {
  const { userId } = req.params

  const contacts = await db.getContactsByUserId(userId)

  res.send(contacts)
})

router.delete('/:userId/contacts/:contactId', async (req, res) => {
  const { userId, contactId } = req.params

  const result = await db.deleteContactForUser(userId, contactId)

  res.send({ result })
})

router.put('/:userId', async (req, res) => {
  const { userId } = req.params
  const updatedValues = req.body

  const user = await db.updateUser(userId, updatedValues)

  res.send(user)
})

router.post('/:userId/contacts/new', async (req, res) => {
  const { userId } = req.params
  const { contactId } = req.body

  const result = await db.addLinq(userId, contactId)

  res.send({ result: result.rowCount !== 0 })
})

module.exports = router
