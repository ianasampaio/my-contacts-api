const { request, response } = require('express');
const ContactsRepository = require('../repositories/ContactsRepository');
const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if(!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id'});
    }

    const contact = await ContactsRepository.findById(id);

    if(!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }
    let category = null;
    if (contact.category_id) {
      category = await CategoriesRepository.findById(contact.category_id);
    }
    response.json({
      contact,
    });
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if(email) {
      const contactExists = await ContactsRepository.findByEmail(email);

      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    if(category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category'});
    }

    const contact = await ContactsRepository.create(name, email || null, phone, category_id || null);

    response.status(201).json({
      contact,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const {name, email, phone, category_id} = request.body;

    if(!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id'});
    }

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists){
      return response.status(404).json({error: 'User not found'});
    }

    if(category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category'});
    }

    if (!name) {
      return response.status(400).json({error: 'Name is required'});
    }

    if(email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);

      if (contactByEmail && contactByEmail.id !== id ){
        return response.status(400).json({error: 'This e-mail is already in use'});
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    response.json(contact);
  }

  async delete(request,response) {
    const { id } = request.params;

    if(!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id'});
    }

    await ContactsRepository.delete(id);
    return response.status(204).end(  );
   }
}

module.exports = new ContactController();