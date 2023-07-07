import PropTypes from 'prop-types';

import {
  List,
  ListItem,
  Name,
  Number,
  Button,
  TrashIcon,
} from './Contacts.styled';

export function Contacts({ contacts, removeContact }) {
  return (
    <List>
      {contacts.map(contact => {
        return (
          <ListItem key={contact.id}>
            <p>
              <Name>{contact.name}:&nbsp;</Name>
              <Number>{contact.number}</Number>
            </p>
            <Button type="button" onClick={() => removeContact(contact.id)}>
              <TrashIcon onClick={() => removeContact(contact.id)} />
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
}
Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeContact: PropTypes.func.isRequired,
};
