const expect = require('chai').expect

const {
  getContactsByUserId,
  deleteContactForUser,
  updateUser,
  addLinq,
  createUser,
  getUser
} = require('../database')

const seed = require('./helpers')

beforeEach(function() {
  return seed().catch(err => console.log(err))
})

describe('getContactsByUserId', function () {
  it('should return all the contacts for a given user', async function () {
    const contacts = await getContactsByUserId(1)

    expect(contacts).to.be.an('array')
    expect(contacts).to.have.lengthOf(1)
    expect(contacts[0]).to.have.property('full_name', 'Ariadne Dionysos')
  })
})

describe('deleteContactForUser', function () {
  it('should delete the given contact for a given user', async function () {
    const contactDeleted = await deleteContactForUser(1, 2)
    const contacts = await getContactsByUserId(1)

    expect(contactDeleted).to.be.true

    expect(contacts).to.be.an('array')
    expect(contacts).to.have.lengthOf(0)
  })
})

describe('updateUser', function () {
  it('should update a given user', async function () {
    updatedUser = {
      full_name: 'Bobby Tables',
      phone: '123',
      email: 'bobby@gmail.com',
      blurb: 'I love my mom'
    }

    const user = await updateUser(2, updatedUser)
    const contacts = await getContactsByUserId(1)

    expect(user).to.be.an('object')
    expect(user).to.have.property('full_name', 'Bobby Tables')

    expect(contacts).to.be.an('array')
    expect(contacts).to.have.lengthOf(1)
    expect(contacts[0]).to.have.property('full_name', 'Bobby Tables')
  })
})

describe('addLinq', function () {
  it('creates a connection between two users', async function () {

    const linqAdded = await addLinq(1, 3)
    const contacts = await getContactsByUserId(1)

    expect(contacts).to.be.an('array')
    expect(contacts).to.have.lengthOf(2)
    expect(contacts[0]).to.have.property('full_name', 'Ariadne Dionysos')
    expect(contacts[1]).to.have.property('full_name', 'Aikaterini Spiridon')
  })
})

describe('createUser', function () {
  it('creates new users', async function () {

    const platon = {
      full_name: 'Platon Haris',
      phone: '456-567-0000',
      email: 'platon@gmail.com',
      blurb: 'Gender: Masculine\nType: Adult\nLocation: Cyprus\nLanguage: Greek'
    }

    const createdUser = await createUser(platon)

    expect(createdUser).to.be.an('object')
    expect(createdUser).to.have.property('full_name', 'Platon Haris')
    expect(createdUser).to.have.property('id', 4)
  })
})

describe('getUser', function () {
  it('returns a user with the given id', async function () {
    const user = await getUser(1)

    expect(user).to.be.an('object')
    expect(user).to.have.property('full_name', 'Zeus Alkyone')
    expect(user).to.have.property('id', 1)
  })
})
