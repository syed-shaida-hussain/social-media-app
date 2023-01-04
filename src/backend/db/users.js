import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: 'Adarsh',
    lastName: 'Balika',
    username: 'adarshbalika',
    password: 'adarshBalika123',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: 'Adarsh',
    lastName: 'Balak',
    username: 'adarshbalak',
    password: 'adarshBalak123',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: 'My',
    lastName: 'Name',
    username: 'myname',
    password: 'myName123',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: 'Guest',
    lastName: 'Account',
    username: 'guest',
    password: 'guest123',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: 'Leo',
    lastName: 'Messi',
    username: 'leomessi',
    password: 'leomessi123',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: 'Cristiano',
    lastName: 'Ronaldo',
    username: 'cristiano',
    password: 'cristiano123',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    firstName: 'Neymar',
    lastName: 'jr',
    username: 'neymarjr',
    password: 'neymar123',
    createdAt: formatDate(),
    updatedAt: formatDate()
  }
];
