const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Ana',
    email: 'ana@mail.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'joana',
    email: 'joana@mail.com',
    phone: '123123123',
    category_id: v4(),
  },
]


class ContactsRepository {
  findAll(){
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id){
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id ===id));
    })
  }

  delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        contacts = contacts.filter((contact) => contact.id !== id);
        resolve();
      }, 1000); // Atraso de 1 segundo (1000 milissegundos) como exemplo
    });
  }

}

module.exports = new ContactsRepository();