import React from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';

import classes from './UrlForm.module.css';

const UrlForm = props => {
  return (
    <Card>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor='name'>Nom de l'url :</label>
        <input
          type='text'
          name='name'
          id='name'
          onChange={props.handleNameChange}
        />
        <label htmlFor='url'>Entrez une url : </label>
        <input
          type='text'
          name='url'
          id='url'
          onChange={props.handleUrlChange}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Card>
  );
};

export default UrlForm;
