import { Component } from 'react';
import { nanoid } from 'nanoid';
import 'notiflix';
import { Notify } from 'notiflix';
import { FormContact } from './FormContact/FormContact';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { MainTitle, Title } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    const isAlreadyInContacts = this.state.contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isAlreadyInContacts) {
      Notify.info(`${name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => ({ contacts: [newContact, ...contacts] }));
    Notify.info(`Contact added`);
  };
  removeContact = idContact => {
    const contacts = this.state.contacts;
    const newContacts = contacts.filter(({ id }) => id !== idContact);

    this.setState(({ contacts }) => ({ contacts: newContacts }));
    // Notify.info(`Contact deleted`);
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getFilteredContacts();
    return (
      <div>
        <MainTitle>Phonebook</MainTitle>
        <FormContact addContact={this.addContact} />
        <Title>Contacts</Title>
        {this.state.contacts !== [] && (
          <Filter value={filter} onChange={this.changeFilter} />
        )}
        <Contacts
          contacts={visibleContacts}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}
