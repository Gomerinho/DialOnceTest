import './App.css';
import React, { useEffect, useState } from 'react';
import UrlForm from './components/UrlForm/UrlForm';

import getAllUrl from './services/urlService';
import Card from './components/UI/Card';

function App() {
  //Définition des states
  const [urls, setUrls] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  //Permet d'initialiser les urls stocker dans l'api
  useEffect(() => {
    if (!urls) {
      getUrls();
    }
  }, [urls]);

  const getUrls = async () => {
    let res = await getAllUrl();
    setUrls(res);
  };

  //Fonction qui permet de rendre chaque un item parmis les urls du state
  const renderUrl = url => {
    return (
      <li key={url._id || Date.now()} className='list__item product'>
        <Card>
          <a href={url.url}>
            <h3 className='url__name'>{url.name}</h3>
          </a>
        </Card>
      </li>
    );
  };

  //Fonction qui permet de changer l'état du nom

  const handleNameChange = event => {
    setName(event.target.value);
  };

  //Fonction qui permet de changer l'état de l'url
  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  //Fonction qui permet de créer un nouveau lien

  const handleSubmit = async event => {
    event.preventDefault();

    if (url.trim() === '' || name.trim() === '') {
      return;
    }
    const json = JSON.stringify({ name: name, url: url });
    //Envoi des données à l'api
    const newUrl = await fetch('http://localhost:5000/api/url', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: json,
    }).then(response => response.json());

    console.log(newUrl);

    //Changement des states
    setUrls(prevState => [newUrl.url, ...prevState]);
    //Reset de nom et url
    setName('');
    setUrl('');
  };

  return (
    <div className='App'>
      <UrlForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleUrlChange={handleUrlChange}
        name={name}
        url={url}
      />
      <ul className='list'>
        {urls && urls.length > 0 ? (
          urls.map(url => renderUrl(url))
        ) : (
          <Card>
            <p>Aucun url disponible</p>
          </Card>
        )}
      </ul>
    </div>
  );
}

export default App;
