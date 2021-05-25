import './App.css';
import React, { useEffect, useState } from 'react';
import UrlForm from './components/UrlForm/UrlForm';

import getAllUrl from './services/urlService';
import Card from './components/UI/Card';

function App() {
  const [urls, setUrls] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!urls) {
      getUrls();
    }
  }, []);

  const getUrls = async () => {
    let res = await getAllUrl();
    console.log(res);
    setUrls(res);
  };

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

  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const data = { _id: String(new Date().getTime()), name: name, url: url };
    const json = JSON.stringify({ name: name, url: url });
    console.log(json);

    await fetch('http://localhost:5000/api/url', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: json,
    }).then(response => console.log(response));
    setUrls(prevState => [data, ...prevState]);
    console.log(urls);
  };

  return (
    <div className='App'>
      <UrlForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleUrlChange={handleUrlChange}
      />
      <ul className='list'>
        {urls && urls.length > 0 ? (
          urls.map(url => renderUrl(url))
        ) : (
          <Card>
            <p>No products found</p>
          </Card>
        )}
      </ul>
    </div>
  );
}

export default App;
