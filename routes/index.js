const router = require('express-promise-router')()
const bodyParser = require('body-parser')
const {
  getContactsByUserId,
  deleteContactForUser,
  updateUser,
  addLinq
} = require('../database')

router.use(bodyParser.json())

router.get('/:userId/contacts', async (req, res) => {
  const { userId } = req.params

  const contacts = await getContactsByUserId(userId)

  res.send(contacts)
})

router.delete('/:userId/contacts/:contactId', async (req, res) => {
  const { userId, contactId } = req.params

  const result = await deleteContactForUser(userId, contactId)

  res.send({ result })
})

router.put('/:userId', async (req, res) => {
  const { userId } = req.params
  const updatedValues = req.body

  const user = await updateUser(userId, updatedValues)

  res.send(user)
})

router.post('/:userId/contacts/new', async (req, res) => {
  const { userId } = req.params
  const { contactId } = req.body

  const result = await addLinq(userId, contactId)

  res.send({ result: result.rowCount !== 0 })
})

router.use((err, req, res, next) => {
  console.log('there was an error:', err)
})

module.exports = router
