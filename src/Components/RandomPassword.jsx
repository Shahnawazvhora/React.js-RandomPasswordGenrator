import React, { useEffect, useState } from 'react';
import copyIcon from "../Images/copy-file-icon.png";
import passwordGif from "../Images/password-genrator.gif";
import { toast } from 'react-hot-toast';

const RandomPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(false);
  const [copyText, setCopyText] = useState('');
  const [strengthLevel, setStrengthLevel] = useState('');

  const getStrengthLevel = () => {
    if (includeUppercase && includeLowercase && includeNumbers && includeSpecialCharacters && passwordLength >= 20) {
      return "Enough Strong";
    }
    else if (includeUppercase && includeLowercase && includeNumbers && includeSpecialCharacters && passwordLength >= 12) {
      return "Strong";
    }
    else if ((includeUppercase || includeLowercase || includeNumbers) && passwordLength >= 8) {
      return "Medium";
    }
    return "Easy";
  };

  useEffect(() => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialCharacters) {
      setIncludeNumbers(true);
    }
    generatePassword(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSpecialCharacters]);

  const handleSliderChange = (event) => {
    setPasswordLength(parseInt(event.target.value));
  };

  const handleCheckboxChange = (setter) => (event) => {
    setter(event.target.checked);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(password);
    setCopyText(password);
    toast.success(`Text Copied - ${password}`);
    setTimeout(() => {
      setCopyText('');
    }, 1000);
  };

  const generatePassword = () => {
    const length = passwordLength;
    const UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const Numbers = "1234567890";
    const SpecialCharacters = '!@#$%^&*()<>,.?/[]{}-=_+|/';
    let characters = '';

    if (includeUppercase) characters += UppercaseLetters;
    if (includeLowercase) characters += LowercaseLetters;
    if (includeNumbers) characters += Numbers;
    if (includeSpecialCharacters) characters += SpecialCharacters;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
    setStrengthLevel(getStrengthLevel());
  };

  return (
    <div className="container">
      <div className="content">
        <div className="gif">
          <img src={passwordGif} alt="password-Gif" />
        </div>
        <div className="text">
          <h1 className='title'>Random Password Generator</h1>
          <p className='subTitle'>Create a strong Password Generator</p>
        </div>
        <input type="text" className='input-field' value={password} readOnly />
        <button className='arrow-symbol' onClick={generatePassword}>↻</button>
        <button className='copy-btn' onClick={handleCopyText}>
          <img src={copyIcon} alt="Copy-Icon" className='copy-icon' />
          {copyText ? "Copied" : "Copy"}
        </button>
        <span className={`password-strength ${getStrengthLevel()}`}>{strengthLevel}</span>
        <div className='slider'>
          <label htmlFor="passwordLength" className='passwordLength'>Password Length: {passwordLength}</label>
          <input type="range" min={5} max={30} value={passwordLength} onChange={handleSliderChange} className='slider-input' />
        </div>
        <div className="checkboxes">
          <div className="checkbox-wrapper">
            <input type="checkbox" name="uppercase" id="uppercase" checked={includeUppercase} className='checkbox-input' onChange={handleCheckboxChange(setIncludeUppercase)} />
            <label htmlFor="uppercase">Uppercase</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" name="lowercase" id="lowercase" checked={includeLowercase} className='checkbox-input' onChange={handleCheckboxChange(setIncludeLowercase)} />
            <label htmlFor="lowercase">Lowercase</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" name="numbers" id="numbers" checked={includeNumbers} className='checkbox-input' onChange={handleCheckboxChange(setIncludeNumbers)} />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" name="specialcharacters" id="specialcharacters" checked={includeSpecialCharacters} className='checkbox-input' onChange={handleCheckboxChange(setIncludeSpecialCharacters)} />
            <label htmlFor="specialcharacters">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomPassword;
