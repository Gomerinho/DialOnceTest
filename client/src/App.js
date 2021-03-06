import './App.css';
import React, { useEffect, useState } from 'react';
import UrlForm from './components/UrlForm/UrlForm';

import getAllUrl from './services/urlService';
import Card from './components/UI/Card';

function App() {
  //Définition des states
  const [urlList, setUrlList] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  //Permet d'initialiser les urls stocker dans l'api
  useEffect(() => {
    if (!urlList) {
      getUrls();
    }
  }, [urlList]);

  const getUrls = async () => {
    let res = await getAllUrl();
    setUrlList(res);
  };

  //Fonction qui permet de rendre chaque un item parmis les urls du state
  const renderUrl = url => {
    return (
      <li key={url._id} className='list__item product'>
        <Card>
          <a href={url.url} target='_blank' rel='noopener noreferrer'>
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
    setUrlList(prevState => [newUrl.url, ...prevState]);
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
        {urlList && urlList.length > 0 ? (
          urlList.map(url => renderUrl(url))
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
