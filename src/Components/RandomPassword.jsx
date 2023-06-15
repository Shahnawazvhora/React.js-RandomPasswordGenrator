import React, { useEffect, useState } from 'react'
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
  const [strengthLevel, setstrengthLevel] = useState('');

  const getSliderColor = () => {
    if (includeUppercase && includeLowercase && includeNumbers && includeSpecialCharacters && passwordLength >= 20) {
      return "EnoughStrong"  
    }
    else if (includeUppercase && includeLowercase && includeNumbers && includeSpecialCharacters && passwordLength >= 12) {
      return "Strong"
    }
    else if ((includeUppercase || includeLowercase || includeNumbers) && passwordLength >= 8) {
      return "Medium"
    }
    else {
      return "Easy"
    }
  }
  useEffect(() => {
    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialCharacters) {
      setIncludeNumbers(true);
    }
  },[includeUppercase, includeLowercase, includeNumbers, includeSpecialCharacters]);

  const sliderPasswordLength = (event) => {
    setPasswordLength(parseInt(event.target.value));
  }

  const handleUppercaseChange = (event) => {
    setIncludeUppercase(event.target.checked);
  };

  const handleLowercaseChange = (event) => {
    setIncludeLowercase(event.target.checked);
  };

  const handleNumbersChange = (event) => {
    setIncludeNumbers(event.target.checked);
  };

  const handleSpecialCharactersChange = (event) => {
    setIncludeSpecialCharacters(event.target.checked);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(password);
    setCopyText(password)
    toast.success(`Text Copied - ${password}`);
    setTimeout(() => {
      setCopyText('');
    }, 1000);
  }

  const genratePassword = () => {
    const lenght = passwordLength;
    const UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const Numbers = 1234567890;
    const SpecialCharacters = '!@#$%^&*()<>,.?/[]{}-=_+|/';
    let characters = '';
    let strengthLevels = '';

    if (includeUppercase && includeLowercase && includeNumbers && includeSpecialCharacters && lenght >= 20) {
      strengthLevels = "Enough Strong";
    }
    else if (includeUppercase && includeLowercase && includeNumbers && includeSpecialCharacters && lenght >= 12) {
      strengthLevels = "Strong"
    }
    else if ((includeUppercase || includeLowercase || includeNumbers) && lenght >= 8) {
      strengthLevels = "Medium";
    }
    else {
      strengthLevels = "Easy";
    }

    if (includeUppercase) {
      characters += UppercaseLetters;
    }
    if (includeLowercase) {
      characters += LowercaseLetters;
    }
    if (includeNumbers) {
      characters += Numbers;
    }
    if (includeSpecialCharacters) {
      characters += SpecialCharacters;
    }

    let newPassword = '';

    for (let i = 0; i < lenght; i++) {
      const randomPassword = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomPassword];
    }
    setPassword(newPassword);
    setstrengthLevel(strengthLevels);
  }

  useEffect(() => {
    genratePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordLength]);

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="gif">
            <img src={passwordGif} alt="password-Gif" />
          </div>
          <div className="text">
            <h1 className='title'>Random PassWord Genrator</h1>
            <p className='subTitle'>Create a strong PassWord Genrator</p>
          </div>
          <input type="text" className='input-field' value={password} onChange={(e) => e.target.value} />
          <button className='arrow-symbol' onClick={genratePassword}>↻</button>
          <button className='copy-btn' onClick={handleCopyText}><img src={copyIcon} alt="Copy-Icon" className='copy-icon' />{copyText ? "Copied" : "Copy"}</button>
          <span className={`password-strength ${getSliderColor()}`}>{strengthLevel}</span>
          <div className='slider'>
            <label htmlFor="passwordLength" className='passwordLength'>Password Length: {passwordLength}</label>
            <input type="range" min={5} max={30} value={passwordLength} onChange={sliderPasswordLength} className='slider-input' />
          </div>
          <div className="checkboxes">
            <div className="checkbox-wrapper">
              <input type="checkbox" name="uppercase" id="uppercase" checked={includeUppercase} className='checkbox-input' onChange={handleUppercaseChange} />
              <label htmlFor="uppercase">uppercase</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" name="lowercase" id="lowercase" checked={includeLowercase} className='checkbox-input' onChange={handleLowercaseChange} />
              <label htmlFor="lowercase">lowercase</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" name="numbers" id="numbers" checked={includeNumbers} className='checkbox-input' onChange={handleNumbersChange} />
              <label htmlFor="numbers">numbers</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" name="specialcharacters" id="specialcharacters" checked={includeSpecialCharacters} className='checkbox-input' onChange={handleSpecialCharactersChange} />
              <label htmlFor="specialcharacters">special characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RandomPassword
