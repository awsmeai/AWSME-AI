import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMBNe43KxFimCbSTPxOcDa9OK8UpL2u8g",
  authDomain: "awsmeai.firebaseapp.com",
  projectId: "awsmeai",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const team = doc(collection(db, "team"), awsmeId);
const embedRef = doc(team, "embed", embedId);
const embedDoc = await getDoc(embedRef);
const chatStyle = embedDoc.data();

// Variable for updateMetric function
let clickedActions = [];

function awsmeAiChatModule() {
// ------ Passed variables --------
// Settings
const AIFirstGreeting = "greetingText" in chatStyle ? chatStyle["greetingText"]: "";
const triggerLabel = "triggerText" in chatStyle ? chatStyle["triggerText"]: "";
const headline = "headline" in chatStyle ? chatStyle["headline"]: "";
const paragraph = "paragraph" in chatStyle ? chatStyle["paragraph"]: "";
const chatPlaceholder = "chatInputText" in chatStyle ? chatStyle["chatInputText"]:"";
const askEmail = "askEmail" in chatStyle ? chatStyle["askEmail"]:false;
const askEmailTrigger = "askEmailTrigger" in chatStyle ? chatStyle["askEmailTrigger"]:"";
const emailRequestText = "emailRequestText" in chatStyle ? chatStyle["emailRequestText"]:"";
const emailProvidedText = "emailProvidedText" in chatStyle ? chatStyle["emailProvidedText"]:"";
const useNameInput = "useNameInput" in chatStyle ? chatStyle["useNameInput"]: false;
const usePhoneInput = "usePhoneInput" in chatStyle ? chatStyle["usePhoneInput"]: false;
const autoOpen = "autoOpen" in chatStyle ? chatStyle["autoOpen"]: false;
const splitScreen = "splitScreen" in chatStyle ? chatStyle["splitScreen"]: false;
let chatWidth = "chatWidth" in chatStyle ? chatStyle["chatWidth"]: 575;

let activeAI = "active" in chatStyle ? chatStyle["active"]: true;
if (!activeAI) {
  return null;
}

const triggerPos = ("triggerPos" in chatStyle ? chatStyle["triggerPos"]:"bottom").toLowerCase();
let triggerPosCSS;
if (triggerPos == "top") {
  triggerPosCSS = "top: 15%;";
}
else if (triggerPos == "middle") {
  triggerPosCSS = "top: 50%;";
}
else {
  triggerPosCSS = "bottom: 15%;";
}
  
// Styling 
const botImgUrl = "aiImage" in chatStyle ? chatStyle["aiImage"]:"https://firebasestorage.googleapis.com/v0/b/awsmeai.appspot.com/o/general%2Fimages%2Fawsme-avatar%202.png?alt=media&token=c8786620-864e-479a-89af-895fa9b8361f";
const visitorImgUrl = "visitorImage" in chatStyle ? chatStyle["visitorImage"]:"https://firebasestorage.googleapis.com/v0/b/awsmeai.appspot.com/o/general%2Fimages%2Favatar-default%201.png?alt=media&token=0769a30e-471a-4616-934c-1a80cbe43054";
const triggerBgCol = "triggerBgCol" in chatStyle ? chatStyle["triggerBgCol"]:"#BE0BB3";
const triggerTextCol = "triggerTextCol" in chatStyle ? chatStyle["triggerTextCol"] : "#f9f9f9";
const headBgCol = "headerBgCol" in chatStyle ? chatStyle["headerBgCol"] : "#171621";
const headTextCol = "headerTextCol" in chatStyle ? chatStyle["headerTextCol"] : "#f9f9f9";
const chatBgCol = "windowBgCol" in chatStyle ? chatStyle["windowBgCol"] : "#f9f9f9";
const chatTextCol = "windowTextCol" in chatStyle ? chatStyle["windowTextCol"] : "#171621";
const inputBgCol = "chatBgCol" in chatStyle ? chatStyle["chatBgCol"] : "#dddddd";
const inputTextCol = "chatTextCol" in chatStyle ? chatStyle["chatTextCol"] : "#1c1c1c";
const closeNormalCol = "closeNormalCol" in chatStyle ? chatStyle["closeNormalCol"] : "#f9f9f9";
const closeHoverCol = "closeHoverCol" in chatStyle ? chatStyle["closeHoverCol"] : "#BE0BB3";
const scoreIconNormalCol = "scoreIconNormalCol" in chatStyle ? chatStyle["scoreIconNormalCol"] : "#BE0BB3";
const scoreIconActiveCol = "scoreIconActiveCol" in chatStyle ? chatStyle["scoreIconActiveCol"] : "#1c1c1c";
const linkNormalCol = "linkNormalCol" in chatStyle ? chatStyle["linkNormalCol"] : "#BE0BB3";
const linkHoverCol = "linkHoverCol" in chatStyle ? chatStyle["linkHoverCol"] : "#171621";
const emailBoxBgCol = "emailBoxBgCol" in chatStyle ? chatStyle["emailBoxBgCol"] : "#f9f9f9";
const emailBoxBrCol = "emailBoxBrCol" in chatStyle ? chatStyle["emailBoxBrCol"] : "#dddddd";
const emailInputBgCol = "emailInputBgCol" in chatStyle ? chatStyle["emailInputBgCol"] : "#ffffff";
const emailInputBrCol = "emailInputBrCol" in chatStyle ? chatStyle["emailInputBrCol"] : "#dddddd";
const emailInputTextCol = "emailInputTextCol" in chatStyle ? chatStyle["emailInputTextCol"] : "#0a090e";
const emailSubmitBgCol = "emailSubmitBgCol" in chatStyle ? chatStyle["emailSubmitBgCol"] : "#BE0BB3";
const emailSubmitBgHoverCol = "emailSubmitBgHoverCol" in chatStyle ? chatStyle["emailSubmitBgHoverCol"] : "#823DA5";
const emailSubmitIconCol = "emailSubmitIconCol" in chatStyle ? chatStyle["emailSubmitIconCol"] : "#ffffff";
const emailSubmitIconHoverCol = "emailSubmitIconHoverCol" in chatStyle ? chatStyle["emailSubmitIconHoverCol"] : "#ffffff";

// -------------------------

  
// Applying dynamic style here
var newStyleTag = document.createElement('style');
var dynamicAddedCSS = `.awsme-sidebar {
      max-width: ${chatWidth}px;
      right: -${chatWidth}px;
    }
    .awsme-ai-chat .awsme-trigger {
      background-color: ${triggerBgCol};
      ${triggerPosCSS}
    }      
    .awsme-ai-chat .awsme-trigger p {
      color: ${triggerTextCol};
    }
    .awsme-ai-chat .awsme-top-area {
      background: ${headBgCol};
      color: ${headTextCol};
    }
    .awsme-ai-chat .awsme-sidebar-inner {
      background: ${chatBgCol};
    }
    .awsme-ai-chat .awsme-chat-row-wrapper .awsme-message {
      color: ${chatTextCol};
    }
    .awsme-ai-chat .awsme-chat-input {
      background: ${inputBgCol};
    }
    .awsme-ai-chat .awsme-user-input {
      color: ${inputTextCol}; 
    }
    .awsme-ai-chat .awsme-send-icon svg {
      fill: ${inputTextCol}; 
    }
    .awsme-close-x svg {
      fill: ${closeNormalCol};
    }
    .awsme-close-x svg:hover {
      fill: ${closeHoverCol};
    }
    .awsme-ai-chat .awsme-bot .awsme-profile {
      background-image: url(${botImgUrl});
    }
    .awsme-ai-chat .awsme-user .awsme-profile {
      background-image: url(${visitorImgUrl});
    }
    .awsme-ai-chat .awsme-review-options svg {
      fill: ${scoreIconNormalCol};
    }
    .awsme-ai-chat .awsme-review-options .awsme-active-icon svg {
      fill: ${scoreIconActiveCol} !important;
    }
    .awsme-ai-chat .awsme-cta-callout-label {
      color: ${linkNormalCol};
    }
    .awsme-ai-chat .awsme-cta-callout-label:hover {
      color: ${linkHoverCol};
    }

    .awsme-chat-area::-webkit-scrollbar {
      width: 10px; 
      background: ${chatBgCol}; 
    }

    .awsme-chat-area::-webkit-scrollbar-thumb {
      background: ${inputBgCol};  
      border-radius: 5px;
    }

    .awsme-chat-area::-webkit-scrollbar-thumb:hover {
      background: ${chatTextCol}; 
    }

    .awsme-chat-area::-webkit-scrollbar-corner {
      background: ${chatTextCol}; 
    }

    .awsme-email-form-wrapper {
       background-color: ${emailBoxBgCol};
        border: 1px solid ${emailBoxBrCol};
      }
      .awsme-email-form input[type=email],
      .awsme-email-form input[type=text], 
      .awsme-email-form input[type=tel] {
        border: 1px solid ${emailInputBrCol};
        background: ${emailInputBgCol};
        color: ${emailInputTextCol};
      }
      .awsme-email-form button {
        background-color: ${emailSubmitBgCol};
      }
      .awsme-email-form button:hover {
        background-color: ${emailSubmitBgHoverCol};
      }
      .awsme-email-form button svg {
        fill: ${emailSubmitIconCol}; 
      }
      .awsme-email-form button:hover svg {
        fill: ${emailSubmitIconHoverCol}; 
      }`;

newStyleTag.textContent = dynamicAddedCSS;
document.head.appendChild(newStyleTag);

 
const chatHTML = `<div class="awsme-ai-chat fade-in" style="z-index:1000000; position: relative;">
  <div class="awsme-trigger">
      <span class="awsme-wave">👋</span> 
    <p style="margin-bottom: 0px;">
      ${triggerLabel}
    </p>
  </div>
  <div class="awsme-sidebar">
    <div class="awsme-top-area">
      <div class="awsme-close-x"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg></div>
      <div class="awsme-sidebar-title">
        ${headline}
      </div>
      <div class="awsme-top-paragraph">
        ${paragraph}
      </div>
    </div>

    <div class="awsme-sidebar-inner">
      <div class="awsme-chat-area">
      </div>

      <div class="awsme-input-area">
        <div class="awsme-chat-input">
          <textarea class="awsme-user-input" type="text" placeholder="${chatPlaceholder}"></textarea>
          <div class="awsme-send-icon"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M3.4 78.3c-6-12-3.9-26.5 5.3-36.3s23.5-12.7 35.9-7.5l448 192c11.8 5 19.4 16.6 19.4 29.4s-7.6 24.4-19.4 29.4l-448 192c-12.3 5.3-26.7 2.3-35.9-7.5s-11.3-24.3-5.3-36.3L92.2 256 3.4 78.3zM120 272L32 448 442.7 272H120zm322.7-32L32 64l88 176H442.7z"/></svg></i></div>
        </div>
      </div>
    </div>
  </div>
</div>`


  const emailFormHTML = `<div class="awsme-email-form-wrapper">
      <form class="awsme-email-form">
      ${useNameInput ? 
        `<div class="awsme-input-group opt-field">
          <input type="text" id="name" name="name" style="margin-bottom: 10px" placeholder="Name...">
        </div>`: ""
      }
      ${usePhoneInput ? 
        `<div class="awsme-input-group opt-field">
          <input type="tel" id="phone" name="phone" style="margin-bottom: 10px" placeholder="Phone Number...">
        </div>`: ""
      }
        <div class="awsme-input-group">
          <input type="email" id="email" name="email" placeholder="Email address...">
          <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512"><path d="M3.4 78.3c-6-12-3.9-26.5 5.3-36.3s23.5-12.7 35.9-7.5l448 192c11.8 5 19.4 16.6 19.4 29.4s-7.6 24.4-19.4 29.4l-448 192c-12.3 5.3-26.7 2.3-35.9-7.5s-11.3-24.3-5.3-36.3L92.2 256 3.4 78.3zM120 272L32 448 442.7 272H120zm322.7-32L32 64l88 176H442.7z"/></svg></button>
        </div>
      </form>
      <div class="awsme-name-error-con" style="display:none;">
          <p>
            Please enter a name
          </p>
      </div>
      <div class="awsme-email-error-con" style="display:none;">
          <p>
            Please enter a valid email address.
          </p>
      </div>
      <div class="awsme-phone-error-con" style="display:none;">
          <p>
            Please enter a valid phone number
          </p>
      </div>
    </div>
    <div class="awsme-email-form-wrapper awsme-successful-submit" style="display: none;">
      <p>
        ${emailProvidedText}
      </p>
    </div>`


  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = chatHTML;
  document.body.appendChild(tempDiv.firstElementChild);
  
  chatWidth = screen.width > chatWidth ? chatWidth:screen.width;
  const triggerButton = document.querySelector('.awsme-trigger');
  const sendButton = document.querySelector('.awsme-send-icon');
  const closeButton = document.querySelector('.awsme-close-x');
  const sidebar = document.querySelector('.awsme-sidebar');

  const reviewIcons = ['<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M288.8 81.7c3.5-12.8 16.7-20.3 29.5-16.8s20.3 16.7 16.8 29.5l-4.5 16.4c-5.5 20.2-13.9 39.3-24.7 56.9c-3.1 4.9-3.2 11.1-.4 16.2s8.2 8.2 14 8.2H448c17.7 0 32 14.3 32 32c0 11.3-5.9 21.3-14.8 27c-7.2 4.6-9.5 13.9-5.3 21.3c2.6 4.6 4.1 10 4.1 15.7c0 12.4-7 23.1-17.3 28.5c-4.2 2.2-7.3 6.1-8.3 10.8s.1 9.5 3 13.2c4.2 5.4 6.7 12.2 6.7 19.5c0 14.2-9.2 26.3-22.1 30.4c-7.8 2.5-12.4 10.6-10.7 18.6c.5 2.2 .7 4.5 .7 6.9c0 17.7-14.3 32-32 32H294.5c-15.8 0-31.2-4.7-44.4-13.4l-38.5-25.7c-9-6-16.6-13.7-22.4-22.6c-4.9-7.4-14.8-9.4-22.2-4.6s-9.4 14.8-4.6 22.2c8.1 12.3 18.7 23.1 31.4 31.6l38.5 25.7c18.4 12.3 40 18.8 62.1 18.8H384c35.3 0 64-28.7 64-64l0-.6c19.1-11.1 32-31.7 32-55.4c0-8.7-1.8-17.1-4.9-24.7C487.9 323.6 496 306.8 496 288c0-6.5-1-12.8-2.8-18.7C504.8 257.7 512 241.7 512 224c0-35.3-28.7-64-64-64H346.4c6.2-13.1 11.3-26.7 15.1-40.9l4.5-16.4c8.1-29.8-9.5-60.6-39.3-68.8s-60.6 9.5-68.8 39.3l-4.5 16.4c-8.9 32.6-29.6 60.8-58.2 79l-3.1 2c-11.8 7.5-21.7 17.1-29.5 28.2c-5.1 7.2-3.3 17.2 4 22.3s17.2 3.3 22.3-4c5.4-7.7 12.2-14.4 20.4-19.5l3.1-2c35.3-22.4 60.9-57.2 71.9-97.5l4.5-16.4zM32 224H96V448H32V224zM0 224V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z"/></svg>',
                      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M480 256A224 224 0 1 1 32 256a224 224 0 1 1 448 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 232a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm184-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM176 336c-8.8 0-16 7.2-16 16s7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176z"/></svg>',
                      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M288.8 430.3c3.5 12.8 16.7 20.3 29.5 16.8s20.3-16.7 16.8-29.5l-4.5-16.4c-5.5-20.2-13.9-39.3-24.7-56.9c-3.1-4.9-3.2-11.1-.4-16.2s8.2-8.2 14-8.2H448c17.7 0 32-14.3 32-32c0-11.3-5.9-21.3-14.8-27c-7.2-4.6-9.5-13.9-5.3-21.3c2.6-4.6 4.1-10 4.1-15.7c0-12.4-7-23.1-17.3-28.5c-4.2-2.2-7.3-6.1-8.3-10.8s.1-9.5 3-13.2c4.2-5.4 6.7-12.2 6.7-19.5c0-14.2-9.2-26.3-22.1-30.4c-7.8-2.5-12.4-10.6-10.7-18.6c.5-2.2 .7-4.5 .7-6.9c0-17.7-14.3-32-32-32H294.5c-15.8 0-31.2 4.7-44.4 13.4l-38.5 25.7c-9 6-16.6 13.7-22.4 22.6c-4.9 7.4-14.8 9.4-22.2 4.6s-9.4-14.8-4.6-22.2c8.1-12.3 18.7-23.1 31.4-31.6l38.5-25.7c18.4-12.3 40-18.8 62.1-18.8H384c35.3 0 64 28.7 64 64l0 .6c19.1 11.1 32 31.7 32 55.4c0 8.7-1.8 17.1-4.9 24.7C487.9 188.4 496 205.2 496 224c0 6.5-1 12.8-2.8 18.7C504.8 254.3 512 270.3 512 288c0 35.3-28.7 64-64 64H346.4c6.2 13.1 11.3 26.7 15.1 40.9l4.5 16.4c8.1 29.8-9.5 60.6-39.3 68.8s-60.6-9.5-68.8-39.3l-4.5-16.4c-8.9-32.6-29.6-60.8-58.2-79l-3.1-2 8.2-12.9-8.2 12.9c-11.8-7.5-21.7-17.1-29.5-28.2c-5.1-7.2-3.3-17.2 4-22.3s17.2-3.3 22.3 4c5.4 7.7 12.2 14.4 20.4 19.5l3.1 2c35.3 22.4 60.9 57.2 71.9 97.5l4.5 16.4zM32 352H96V128H32V352zM0 352V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"/></svg>']
  const reviewIconsSolid = ['<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>',
                            '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM176.4 176a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM160 336H352c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>',
                            '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"/></svg>']

  function setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
  
  setTimeout(function() {
    // Get users stored email for AWSME AI
    let userName = (localStorage.getItem('name_'+awsmeId) != null && localStorage.getItem('name_'+awsmeId) != "") ? localStorage.getItem('name_'+awsmeId): "";
    let userEmail = localStorage.getItem('email_'+awsmeId) != null ? localStorage.getItem('email_'+awsmeId): "";
    let isLead = localStorage.getItem('isLead_'+awsmeId) == "true";
    let openChat = getWithExpiry('open_chat_'+awsmeId) != null ? getWithExpiry('open_chat_'+awsmeId):true;
    let usedInteractions = [];
    let firstClick = true;
    
    function openSidebar() {
      sidebar.style.right = '0';
      if (firstClick) {
        updateMetric("numTriggerClicks");
        firstClick = false;
      }
      if (splitScreen && screen.width >= 2* chatWidth) {
        document.documentElement.style.transition = "0.3s ease-in-out"
        document.documentElement.style.marginRight = chatWidth + "px";
      }
      if (chatWidth == screen.width) {
        document.body.style.overflow = 'hidden';
      }
      else {
        document.querySelector(".awsme-user-input").focus();
      }
      if (autoOpen) {
        setWithExpiry('open_chat_'+awsmeId, true, 3600000)
      }
    }
    function closeSidebar() {
      sidebar.style.right = '-' + chatWidth + 'px';
      if (window.innerWidth < 575) {
        document.body.style.overflow = 'scroll';
      }
      if (splitScreen && screen.width >= 2* chatWidth) {
        document.documentElement.style.marginRight = "0px";
      }
      if (autoOpen) {
        setWithExpiry('open_chat_'+awsmeId, false, 3600000)
      }
    }
    
    if (autoOpen && openChat) {
      openSidebar();
    }
    
    triggerButton.addEventListener('click', () => {
      openSidebar();
    });
    closeButton.addEventListener('click', () => {
      closeSidebar()
    });


    function postmark_send_email_template(templateId, templateModel) {
      let response = fetch('https://awsme.co/api/send-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                team_id: awsmeId,
                template_id: templateId,
                template_model: templateModel
            }),
        })
    }



    // AI loader indicator HTML template
    function loaderIndicatorGen() {
      let loader = `<div class="awsme-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>`
      return loader;
    }

    // AI RESPONSE AND CHAT LOGIC
    const userInput = document.querySelector(".awsme-user-input");
    const messageArea = document.querySelector(".awsme-chat-area"); // Where messages will be displayed

    // AI write functionality
    function AITextGen(element, textList) {
      let index = 0;
      let interval = setInterval(() => {
          if (index < textList.length) {
            let item = textList[index];
            if (typeof item === 'string') {
              element.innerHTML += item;
            }
            else if (item instanceof HTMLElement) {
              element.appendChild(item);
            }
            
            if (index % 25 == 0) {
                messageArea.scrollTop = messageArea.scrollHeight;
            }
            index++;
          }
          else {
            setTimeout(function() {
              messageArea.scrollTop = messageArea.scrollHeight;
            }, 200);
            setTimeout(function() {
              setVideoClickAction();
              setLinkClickAction();
            }, 500);
            clearInterval(interval);
            setFormAction();
            if (element.parentElement.parentElement.querySelector(".awsme-review-options")) {
              element.parentElement.parentElement.querySelector(".awsme-review-options").style.opacity = 1;
            }
          }
      }, 20)
      waiting = false
    }

    // Generat unique id
    function generateUniqueId() {
      let timeStamp = Date.now();
      let   randomNumber = Math.floor(Math.random() * 1000000).toString();
      return `id-${timeStamp}-${randomNumber}`;
    }

    // generate response row
    function responseRowGen(isAI, text, id, showReview) {
      let row;
      if (showReview) {
        const row_index = document.querySelectorAll(".awsme-review-row").length;
        row = `<div class="awsme-chat-row-wrapper ${row_index} ${isAI ? "awsme-bot": "awsme-user"} ${showReview ? "awsme-review-row": ""}">
                  <div class="awsme-profile">
                      ${isAI ? "": ""}
                  </div>
                  <div class="awsme-message-col">
                    <div class="awsme-message-content">
                      <p class="awsme-message" id=${id}>${text}</p>
                    </div>
                    <div class="awsme-review-options" style="opacity:0;">
                      <div class="awsme-thumbs-up">${reviewIcons[0]}</div>
                      <div class="awsme-neutral">${reviewIcons[1]}</div>
                      <div class="awsme-thumbs-down">${reviewIcons[2]}</div>
                    </div>
                  </div>
                </div>
              </div>`;
      } 
      else {
        row = `<div class="awsme-chat-row-wrapper ${isAI ? "awsme-bot": "awsme-user"}">
                  <div class="awsme-profile">
                      ${isAI ? "": ""}
                  </div>
                  <p class="awsme-message" id=${id}>${text}</p>
                </div>`;
      }
      return row;
    }

    // Function for setting link click action
    function setLinkClickAction() {
      let links = document.querySelectorAll(".awsme-ai-chat .awsme-chat-area .awsme-link-action");
      if (links.length == 0) {
        return false;
      }
      let newLink = links[links.length-1];
      let action_id = newLink.id;
      newLink.onclick = function() { updateMetric('', 'action', action_id, 'clicks') };
    }

    // Function for connecting video start action
    let player;
    function setVideoClickAction() {
      let videos= document.querySelectorAll(".awsme-ai-chat .awsme-chat-area .awsme-video-action");
      if (videos.length == 0) {
        return false;
      }
      let newVideo = videos[videos.length-1];
      let action_id = newVideo.id;
      let videoData = newVideo.className.split(" ")
      let videoId = videoData[1];
      let videoPlatform = videoData[2]
      if (videoPlatform == "youtube") {
        player = new YT.Player(action_id, {
          height: '200',
          width: '360',
          videoId: videoId,
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
        function onPlayerStateChange(event) {
          updateMetric('', 'actions', action_id, 'clicks')
        }
      }
      else if (videoPlatform == "vimeo") {
        let iframeString = `<iframe id="${action_id}" src="https://player.vimeo.com/video/${videoId}" width="360" height="200" frameborder="0" allowfullscreen></iframe>`;
        newVideo.innerHTML = iframeString;
        let iframe = newVideo.querySelector("#" + action_id);
        player = new Vimeo.Player(iframe);
        player.on('loaded', function() {
          player.on('play', function() {
            updateMetric('', 'actions', action_id, 'clicks');
          });
        });
      }
    }
    
    function getIframeFromUrl(url, id) {
      let newUrl = '';
      const vimeoRegex = /https:\/\/vimeo\.com\/(\d+)/;
      const vimeoMatch = url.match(vimeoRegex);
      let videoId;
      let platform;
      if (vimeoMatch) {
        platform = "vimeo";
        videoId = vimeoMatch[1];
        newUrl = `https://player.vimeo.com/video/${videoId}`;
      }
      const youtubeRegex = /https:\/\/youtu\.be\/([\w-]+)/;
      const youtubeMatch = url.match(youtubeRegex);
      if (youtubeMatch) {
        platform = "youtube";
        videoId = youtubeMatch[1];
        newUrl = `https://youtube.com/embed/${videoId}`;
      }
      if (newUrl != "") {
        let iframe = `<div id=${id} class="awsme-video-action ${videoId} ${platform}"></div>`;
        return iframe;
      }
      return "";
    }
    
     
    function getGifHTML(url, ratio) {
        let gifHeight = 360 * ratio;
        let iframe = `<iframe src="${url}" width="360" height="${gifHeight}" frameBorder="0" class="awsme-chat-gif"></iframe>`;
        return iframe;
    }
    
    function responseHTMLModifier(string, className, action_data) {
      let action_id = action_data[0]
      let newString = string.replace(/<br>/g, "§");
      let stringList = newString.split("");
      stringList = stringList.map(item => item.replace(/§/g, "<br>"))
      if (action_id.length > 10 && !usedInteractions.includes(action_id)) {
        usedInteractions.push(action_id)
        let action_url = action_data[1]
        let action_cta = action_data[2]
        let action_type = action_data[3]
        let action_ratio = parseFloat(action_data[4])
        updateMetric('', 'action', action_id, 'views');
        let ctaHTML = "";
        if (action_type == "link") {
          ctaHTML = `<a class="${className} awsme-link-action awsme-cta-callout" id="${action_id}" href="${action_url}" target="_blank">
            <span class="awsme-cta-callout-label">${action_cta}</span>
            </a>`
        }
        else if (action_type == "video") {
          ctaHTML = getIframeFromUrl(action_url, action_id);
        }
        else if (action_type == "gif") {
          ctaHTML = getGifHTML(action_url, action_ratio);
        }
        if (chatHTML != "") {
          stringList.push(ctaHTML);
        }
        else {
          console.log(action_type);
        }
      }

      let lead_ref = localStorage.getItem('lead_ref_'+awsmeId) != null ? localStorage.getItem('lead_ref_'+awsmeId): "";
      if (lead_ref == "" && askEmail && !isLead) {
        if (askEmailTrigger == "firstMsg" && questionsAndAnswers.length == 1) {
          stringList = [...stringList, "\n", ...emailRequestText.split("")];
          stringList.push(emailFormHTML);
        }
        else if (askEmailTrigger == "secMsg" && questionsAndAnswers.length == 2) {
          stringList = [...stringList, "\n", ...emailRequestText.split("")];
          stringList.push(emailFormHTML);
        }
        else if (askEmailTrigger == "thrdMsg" && questionsAndAnswers.length == 3) {
          stringList = [...stringList, "\n", ...emailRequestText.split("")];
          stringList.push(emailFormHTML);
        }
      }
      
      return stringList;
    }   
 

    async function createNewConvDoc(question, answer) {
      try {
        let response = await fetch('https://awsme.co/api/create-conv/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                team_id: awsmeId,
                question: question,
                answer: answer
            }),
        })
        if (response.ok) {
          response = await response.text();
          response = JSON.parse(response);
          let conversation_ref = response.conversation_ref;
          return conversation_ref;
        }
        else {
          console.log("Failed to create conversation");
          return "";
        }
      }
      catch {
        console.log("Failed create conversation");
        return "";
      }
    }

    
    let conversation = "";
    if (userName != "") {
      conversation += "{system: Greet the user by name in the next response, their name is: " + userName + "}";
    }
    else if (userEmail != "") {
      conversation += "{system: Greet the user by name in the next response, here is their email as a reference for their name: " + userEmail + "}";
    }
        
    let reviewRefs = [];
    let questionsAndAnswers = [];
    let conversationId = "";
    async function getAIResponse(userMessage) {
      userMessage = userMessage.replace("{", "").replace("}", "");
      let lead_stage = localStorage.getItem('lead_stage_'+awsmeId) != null ? localStorage.getItem('lead_stage_'+awsmeId): "";
      let lead_ref = localStorage.getItem('lead_ref_'+awsmeId) != null ? localStorage.getItem('lead_ref_'+awsmeId): "";
      let newMessage = `{user: ${userMessage}}`;
      while (conversation.length > 300) {
          conversation = conversation.substring(conversation.indexOf('}') + 1).trim();
      }
      conversation += newMessage;
      let new_session;
      if (firstEngagement) {
          new_session = true;
      }
      else {
          new_session = false;
      }
      let crm_ids = localStorage.getItem('crm_ids_'+awsmeId) != null ? JSON.parse(localStorage.getItem('crm_ids_'+awsmeId)): {};
      
      let message = "I'm currently recharging my circuits but I'll be up and running shortly. Thanks for your patience!";
      let action_data = ["", "", "", "", 0];
      try {
        let response = await fetch('https://awsme.co/api/call/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: conversation,
                user_id: awsmeId,
                lead_stage: lead_stage,
                lead_ref: lead_ref,
                conv_ref: conversationId,
                new_session: new_session,
                crm_ids: crm_ids
            }),
        })
        if (response.ok) {
          response = await response.text();
          response = JSON.parse(response);
          action_data = response.action_data;
          lead_stage = response.lead_stage;
          localStorage.setItem('lead_stage_'+awsmeId, lead_stage)
          message = response.response;
          message = message.replace(/{|}|\[.*?\]|\(.*?\)/g, '')
                     .replace(/\n/g, '<br>')
                     .replace(/(<br>){3,}/g, '<br>').replace(/\<br><br>!<br><br>/g, '');
        }
        else {
          console.log("Failed request to AI");
        }
      }
      catch {
        console.log("Failed request to AI");
      }
      reviewRefs.push("");
      questionsAndAnswers.push({"question": userMessage, "answer": message})
      conversation += `{assistant: ${message}}`;
      conversation = conversation.replace(/{system:[^}]*}/g, '');
  
      return [message, action_data];
    }

    // Create new lead in database
    async function createLead(name, email, phone) {
      let response = await fetch('https://awsme.co/api/create-lead/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: name,
              email: email, 
              phone: phone,
              messages: conversation,
              conv_ref: conversationId,
              user_id: awsmeId
          }),
      })
      response = await response.text();
      response = JSON.parse(response)
      try {
        let lead_ref = response.lead_ref;
        if (lead_ref.length > 0) {
            localStorage.setItem('lead_ref_'+awsmeId, lead_ref)
        }
        let crm_ids = response.crm_ids;
        if (Object.keys(crm_ids).length > 0) {
          localStorage.setItem('crm_ids_'+awsmeId, JSON.stringify(crm_ids))
        }
      }
      catch {
        console.log("Some property were missing in the create lead response.")
      }
      console.log(response.response)
    }

    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }

    function isValidPhoneNumber(phoneNumber) {
      const phoneRegex = /^[0-9()+\-, .\s]{7,20}$/;
      return phoneRegex.test(phoneNumber);
  }
    
    // Set email capture action
    function setFormAction() {
      let forms = document.querySelectorAll(".awsme-email-form");
      if (forms.length > 0) {
        let form = forms[forms.length-1];
        form.addEventListener("submit", function(event) {
          event.preventDefault();
          let email = this.querySelector("#email").value;
          let name = "";
          if (useNameInput) {
            name = this.querySelector("#name").value;
          }
          let phone = "";
          if (usePhoneInput) {
            phone = this.querySelector("#phone").value;
          }

          if (useNameInput && name.length == 0) {
            this.parentElement.querySelector(".awsme-name-error-con").style.display = "block";
          }
          else if (!isValidEmail(email)) {
            this.parentElement.querySelector(".awsme-email-error-con").style.display = "block";
          }
          else if (usePhoneInput && !isValidPhoneNumber(phone)) {
            this.parentElement.querySelector(".awsme-phone-error-con").style.display = "block";
          }
          else {
            this.parentElement.querySelector(".awsme-name-error-con").style.display = "none";
            this.parentElement.querySelector(".awsme-email-error-con").style.display = "none";
            this.parentElement.querySelector(".awsme-phone-error-con").style.display = "none";
            if (name.length != 0) {
              localStorage.setItem('name_'+awsmeId, name)
            }
            localStorage.setItem('email_'+awsmeId, email)
            localStorage.setItem('isLead_'+awsmeId, true)
            createLead(name, email, phone);
            
            let lead_email_parameters = {"visitor_email": email};
            this.querySelector("#email").value = "";
            if (name != "") {
              lead_email_parameters["visitor_name"] = name
              this.querySelector("#name").value = "";
            }
            if (phone != "") {
              lead_email_parameters["visitor_phone"] = phone
              this.querySelector("#phone").value = ""
            }

            postmark_send_email_template("35128606", lead_email_parameters)
            
            this.parentElement.parentElement.querySelector(".awsme-successful-submit").style.display = "block";
            this.parentElement.remove();
          }
        })
      }
    }


    // Response review saving
    async function saveReview(rating, question, answer, reviewIndex) {
      updateMetric("numRatings");
      let visitor_name = userName != "" ? userName: "anonymous visitor";
      if (visitor_name == "") {
        visitor_name = userEmail != "" ? userEmail: "anonymous visitor";
      }
      
      let questionParagraphs = question.replace(/\n\n/g, "<br><br>").split(/\<br\><br\>/ig).map(function(x) {
          return {"paragraph": x};
      });
      let answerParagraphs = answer.replace(/\n\n/g, "<br><br>").split(/\<br\><br\>/ig).map(function(x) {
          return {"paragraph": x};
      });
      
      if (rating == "Good") {
        updateMetric("numThumbsUp");
        postmark_send_email_template("35046715", {"chat_question": questionParagraphs, "ai_response": answerParagraphs, "visitor_name": visitor_name})
      }
      else if (rating == "Okay") {
        updateMetric("numThumbsNeutral")
        postmark_send_email_template("35118313", {"chat_question": questionParagraphs, "ai_response": answerParagraphs, "visitor_name": visitor_name})
      }
      else if (rating == "Bad") {
        updateMetric("numThumbsDown");
        postmark_send_email_template("35046526", {"chat_question": questionParagraphs, "ai_response": answerParagraphs, "visitor_name": visitor_name})
      }
      let response = await fetch('https://awsme.co/api/save-review/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          answer: answer,
          rating: rating,
          user_id: awsmeId
        }),
      })
      response = await response.text();
      response = JSON.parse(response);
      let message = response.response;
      let ref = response.ref;
      reviewRefs[reviewIndex] = ref;
      console.log(message);
    }

    
    async function updateReview(rating, ref) {
      let response = await fetch('https://awsme.co/api/update-review/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: ref,
          rating: rating,
          user_id: awsmeId
        }),
      })
      response = await response.text();
      let message = JSON.parse(response).response;
      console.log(message);
    }

    
    function updateClickEvents() {
      // UPDATE HUBDB WHEN ICON IS PRESSED
      document.querySelectorAll(".awsme-thumbs-up").forEach(function(element) {
        element.addEventListener("click", function() {
          var score = "Good";
          var parentClasses = element.parentElement.parentElement.parentElement.className.split(" ");
          var refIndex = parseInt(parentClasses[1]);
          var responseRef = reviewRefs[refIndex];
          if (responseRef == "") {
            saveReview(score, questionsAndAnswers[refIndex]["question"], questionsAndAnswers[refIndex]["answer"], refIndex)
          }
          else {
            updateReview(score, responseRef);
          }
        });
      });
      document.querySelectorAll(".awsme-neutral").forEach(function(element) {
        element.addEventListener("click", function() {
          var score = "Okay";
          var parentClasses = element.parentElement.parentElement.parentElement.className.split(" ");
          var refIndex = parseInt(parentClasses[1]);
          var responseRef = reviewRefs[refIndex];
          if (responseRef == "") {
            saveReview(score, questionsAndAnswers[refIndex]["question"], questionsAndAnswers[refIndex]["answer"], refIndex)
          }
          else {
            updateReview(score, responseRef);
          }
        });
      });
      document.querySelectorAll(".awsme-thumbs-down").forEach(function(element) {
        element.addEventListener("click", function() {
          var score = "Bad";
          var parentClasses = element.parentElement.parentElement.parentElement.className.split(" ");
          var refIndex = parseInt(parentClasses[1]);
          var responseRef = reviewRefs[refIndex];
          if (responseRef == "") {
            saveReview(score, questionsAndAnswers[refIndex]["question"], questionsAndAnswers[refIndex]["answer"], refIndex)
          }
          else {
            updateReview(score, responseRef);
          }
        });
      });
      // CHANGE LOOK OF ICONS ON CLICK
      var elements = document.querySelectorAll('.awsme-thumbs-up, .awsme-neutral, .awsme-thumbs-down');
      elements.forEach(function(element) {
        element.addEventListener('click', function() {
          var icons = element.parentElement.children;
          for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            if (icon.className.includes("awsme-thumbs-up")) {
              icon.innerHTML = reviewIcons[0]
            }
            else if (icon.className.includes("awsme-neutral")) {
              icon.innerHTML = reviewIcons[1]
            }
            else if (icon.className.includes("awsme-thumbs-down")) {
              icon.innerHTML = reviewIcons[2]
            }
          }
          if (element.className.includes("awsme-thumbs-up")) {
              element.innerHTML = reviewIconsSolid[0]
            }
            else if (element.className.includes("awsme-neutral")) {
              element.innerHTML = reviewIconsSolid[1]
            }
            else if (element.className.includes("awsme-thumbs-down")) {
              element.innerHTML = reviewIconsSolid[2]
            }
        });
      });
    }

    // Event listener for user input submission
    let lastEnterTimestamp = 0;
    let isLongDelay = true;
    let waiting = false;
    userInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter" && event.shiftKey && !waiting) {
        const currentTime = Date.now();

        if (isLongDelay || currentTime - lastEnterTimestamp > 300) {
          if (isLongDelay) {
            isLongDelay = false;
            setTimeout(() => {
              isLongDelay = true;
            }, 1000); // Change this delay for the initial long delay
          }

          lastEnterTimestamp = currentTime;

          event.preventDefault(); // Prevent sending the message
          let cursorPosition = userInput.selectionStart; // Get the cursor position
          let textBeforeCursor = userInput.value.substring(0, cursorPosition);
          let textAfterCursor = userInput.value.substring(cursorPosition);
          let newText = textBeforeCursor + '\n' + textAfterCursor;
          userInput.value = newText;
          userInput.scrollTop = userInput.scrollHeight;
        }
      }
      else if (event.key === "Enter" && !waiting) {
        event.preventDefault();
        waiting = true;
        submit();
      }
    });

    sendButton.onclick = () => {
      waiting = true;
      document.querySelector(".awsme-user-input").focus();
      submit();
    }

    let firstEngagement = true;
    async function submit() {
      let inputText = userInput.value;
      userInput.value = "";

      // User chat row
      messageArea.innerHTML += responseRowGen(false, inputText, "", false)

      uniqueId = generateUniqueId();
      // Ai chat row
      messageArea.innerHTML += responseRowGen(true, "", uniqueId, true)
      messageArea.scrollTop = messageArea.scrollHeight;

      // Add loading indicator
      let responseDiv = document.querySelector(`#${uniqueId}`);
      let responseParent = responseDiv.parentNode;
      responseParent.innerHTML += loaderIndicatorGen();

      // Wait for AI response
      let action_data;
      let aiResponse;
      [aiResponse, action_data] = await getAIResponse(inputText);

      // Remove load indicator
      responseParent.querySelector(".awsme-typing-indicator").remove()

      // Write out AI response
      responseDiv = document.querySelector(`#${uniqueId}`);

      // Modify AI response string to instead have html elements in it
      let actionElementClass = generateUniqueId();
      let aiResponseList = responseHTMLModifier(aiResponse, actionElementClass, action_data);

      if (aiResponse) {
          AITextGen(responseDiv, aiResponseList)
      }
      else {
          AITextGen(responseDiv, "Something went wrong, I couldn't answer. Try again".split(''))
      }

      updateClickEvents();
      if (firstEngagement) {
          if (!isLead) {
            conversationId = await createNewConvDoc(inputText.replace("{", "").replace("}", ""), aiResponse);
          }
          firstEngagement = false;
          updateMetric("numEngagements");
      }
      updateMetric("numResponses");
      updateAIPage(window.location.protocol + "//" + window.location.hostname + window.location.pathname);
  }

    // First prompt from AI
    let uniqueId = generateUniqueId();
    messageArea.innerHTML += responseRowGen(true, "", uniqueId, false)
    let responseDiv = document.querySelector(`#${uniqueId}`);
    AITextGen(responseDiv, AIFirstGreeting)

    updateMetric("numTriggerViews");
  }, 200)

  document.addEventListener('DOMContentLoaded', function() {
    var textarea = document.querySelector('textarea.awsme-user-input');
    textarea.addEventListener('input', function() {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
  });

}

awsmeAiChatModule();
  
  
// UPDATE PAGE RESPONSES FIRESTORE (Must be in global scope)
async function updateAIPage(url) {
  let response = await fetch('https://awsme.co/api/ai-page/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: awsmeId,
      url: url
    }),
  })
  response = await response.text();
  let message = JSON.parse(response).response;
  console.log(message);
}

// UPDATE METRICS IN FIRESTORE (Must be in global scope)
async function updateMetric(team_metric="", subcollection="", sub_doc_ref="", sub_metric="") {
  if (sub_doc_ref != "") {
    const actionKey = sub_doc_ref + "_" + sub_metric;
    if (clickedActions.includes(actionKey)){
      return false;
    }
    clickedActions.push(actionKey);
  }
  let response = await fetch('https://awsme.co/api/metric/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: awsmeId,
      team_metric: team_metric,
      subcollection: subcollection,
      sub_doc_ref: sub_doc_ref,
      sub_metric: sub_metric
    }),
  })
  response = await response.text();
  let message = JSON.parse(response).response;
  console.log(message);
}
