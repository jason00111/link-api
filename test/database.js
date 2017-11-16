const expect = require('chai').expect

const {
  getContactsByUserId,
  deleteContactForUser,
  updateUser,
  addLinq
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
