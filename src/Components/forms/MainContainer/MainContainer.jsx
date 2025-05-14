import React, { useState } from 'react';
import RecipientForm from '../RecipientForm/RecipientForm';
import CheckboxSelector from '../Mediaselector/MediaSelectortype/CheckboxSelector'
import ActionButtons from '../Buttons/ActionButtons';

const MainContainer = () => {
  // Estado do Formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Estado do CheckboxSelector
  const [mediaState, setMediaState] = useState({
    selectedOptions: {
      photos: false,
      video: false,
      music: false
    },
    photos: [],
    video: null,
    selectedMusic: null
  });

  // Atualiza o formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Atualiza o CheckboxSelector
  const handleMediaChange = (newState) => {
    setMediaState(newState);
  };

  // Função de RESET (limpa TUDO)
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setMediaState({
      selectedOptions: {
        photos: false,
        video: false,
        music: false
      },
      photos: [],
      video: null,
      selectedMusic: null
    });
  };

  return (
    <div className="main-container">
      <RecipientForm
        formData={formData}
        onInputChange={handleInputChange}
      />
      
      <CheckboxSelector
        mediaState={mediaState}
        onMediaChange={handleMediaChange}
      />
      
      <ActionButtons 
        onReset={handleReset}
        onSubmit={() => console.log('Submitting:', { formData, mediaState })}
      />
    </div>
  );
};

export default MainContainer;