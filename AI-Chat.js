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

const user = doc(collection(db, "users"), awsmeId);
const embedRef = doc(user, "embedScript", embedId);
const embedDoc = await getDoc(embedRef);
const chatStyle = embedDoc.data();


function awsmeAiChatModule() {
// ------ Passed variables --------
// Settings
const AIFirstGreeting = chatStyle["greetingText"];
const triggerLabel = chatStyle["triggerText"];
const headline = chatStyle["headline"];
const paragraph = chatStyle["paragraph"];
const chatPlaceholder = chatStyle["chatInputText"];
const askEmail = chatStyle["askEmail"];
const askEmailTrigger = chatStyle["askEmailTrigger"];
const emailRequestText = chatStyle["emailRequestText"];
const emailProvidedText = chatStyle["emailProvidedText"];
  
// Styling 
const botImgUrl = chatStyle["aiImage"];
const visitorImgUrl = chatStyle["visitorImage"];
const triggerBgCol = chatStyle["triggerBgCol"];
const triggerTextCol = chatStyle["triggerTextCol"];
const headBgCol = chatStyle["headerBgCol"];
const headTextCol = chatStyle["headerTextCol"];
const chatBgCol = chatStyle["windowBgCol"];
const chatTextCol = chatStyle["windowTextCol"];
const inputBgCol = chatStyle["chatBgCol"];
const inputTextCol = chatStyle["chatTextCol"]; 
const closeNormalCol = chatStyle["closeNormalCol"];
const closeHoverCol = chatStyle["closeHoverCol"];
const scoreIconNormalCol = chatStyle["scoreIconNormalCol"];
const scoreIconActiveCol = chatStyle["scoreIconActiveCol"];
const linkNormalCol = chatStyle["linkNormalCol"];
const linkHoverCol = chatStyle["linkHoverCol"];
const emailBoxBgCol = chatStyle["emailBoxBgCol"];
const emailBoxBrCol = chatStyle["emailBoxBrCol"];
const emailInputBgCol = chatStyle["emailInputBgCol"];
const emailInputBrCol = chatStyle["emailInputBrCol"];
const emailInputTextCol = chatStyle["emailInputTextCol"];
const emailSubmitBgCol = chatStyle["emailSubmitBgCol"];
const emailSubmitBgHoverCol = chatStyle["emailSubmitBgHoverCol"];
const emailSubmitIconCol = chatStyle["emailSubmitIconCol"];
const emailSubmitIconHoverCol = chatStyle["emailSubmitIconHoverCol"];
// -------------------------

  
// Applying dynamic style here
var newStyleTag = document.createElement('style');
var dynamicAddedCSS = `.awsme-ai-chat .trigger {
      background-color: ${triggerBgCol};
    }      
    .awsme-ai-chat .trigger p {
      color: ${triggerTextCol};
    }
    .awsme-ai-chat .top-area {
      background: ${headBgCol};
      color: ${headTextCol};
    }
    .awsme-ai-chat .sidebar-inner {
      background: ${chatBgCol};
    }
    .awsme-ai-chat .chat-row-wrapper .message {
      color: ${chatTextCol};
    }
    .awsme-ai-chat .chat-input {
      background: ${inputBgCol};
    }
    .awsme-ai-chat .user-input {
      color: ${inputTextCol}; 
    }
    .awsme-ai-chat .send-icon svg {
      fill: ${inputTextCol}; 
    }
    .close-x svg {
      fill: ${closeNormalCol};
    }
    .close-x svg:hover {
      fill: ${closeHoverCol};
    }
    .awsme-ai-chat .bot .profile {
      background-image: url(${botImgUrl});
    }
    .awsme-ai-chat .user .profile {
      background-image: url(${visitorImgUrl});
    }
    .awsme-ai-chat .review-options svg {
      fill: ${scoreIconNormalCol};
    }
    .awsme-ai-chat .review-options .active-icon svg {
      fill: ${scoreIconActiveCol} !important;
    }
    .awsme-ai-chat .cta-callout-label {
      color: ${linkNormalCol};
    }
    .awsme-ai-chat .cta-callout-label:hover {
      color: ${linkHoverCol};
    }

    .chat-area::-webkit-scrollbar {
      width: 10px; 
      background: ${chatBgCol}; 
    }

    .chat-area::-webkit-scrollbar-thumb {
      background: ${inputBgCol};  
      border-radius: 5px;
    }

    .chat-area::-webkit-scrollbar-thumb:hover {
      background: ${chatTextCol}; 
    }

    .chat-area::-webkit-scrollbar-corner {
      background: ${chatTextCol}; 
    }

    .email-form-wrapper {
       background-color: ${emailBoxBgCol};
        border: 1px solid ${emailBoxBrCol};
      }
      .email-form input[type=email] {
        border: 1px solid ${emailInputBrCol};
        background: ${emailInputBgCol};
        color: ${emailInputTextCol};
      }
      .email-form button {
        background-color: ${emailSubmitBgCol};
      }
      .email-form button:hover {
        background-color: ${emailSubmitBgHoverCol};
      }
      .email-form button svg {
        fill: ${emailSubmitIconCol}; 
      }
      .email-form button:hover svg {
        fill: ${emailSubmitIconHoverCol}; 
      }`;

newStyleTag.textContent = dynamicAddedCSS;
document.head.appendChild(newStyleTag);

 
const chatHTML = `<div class="awsme-ai-chat fade-in" style="z-index:1000000; position: relative;">
  <div class="trigger" style="bottom: 15%;">
      <span class="wave">👋</span> 
    <p style="margin-bottom: 0px;">
      ${triggerLabel}
    </p>
  </div>
  <div class="sidebar">
    <div class="top-area">
      <div class="close-x"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"/></svg></div>
      <div class="sidebar-title">
        ${headline}
      </div>
      <div class="top-paragraph">
        ${paragraph}
      </div>
    </div>

    <div class="sidebar-inner">
      <div class="chat-area">
      </div>

      <div class="input-area">
        <div class="chat-input">
          <textarea class="user-input" type="text" placeholder="${chatPlaceholder}"></textarea>
          <div class="send-icon"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M3.4 78.3c-6-12-3.9-26.5 5.3-36.3s23.5-12.7 35.9-7.5l448 192c11.8 5 19.4 16.6 19.4 29.4s-7.6 24.4-19.4 29.4l-448 192c-12.3 5.3-26.7 2.3-35.9-7.5s-11.3-24.3-5.3-36.3L92.2 256 3.4 78.3zM120 272L32 448 442.7 272H120zm322.7-32L32 64l88 176H442.7z"/></svg></i></div>
        </div>
        <p class="input-note">
          <a href="https://awsme.ai" target="_blank">AWSME.ai</a> - Always on. Always AWSME.
        </p>
      </div>
    </div>
  </div>
</div>`


  const emailFormHTML = `<div class="email-form-wrapper">
      <form class="email-form">
        <input type="email" id="email" name="email" placeholder="Email address...">
        <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512"><path d="M3.4 78.3c-6-12-3.9-26.5 5.3-36.3s23.5-12.7 35.9-7.5l448 192c11.8 5 19.4 16.6 19.4 29.4s-7.6 24.4-19.4 29.4l-448 192c-12.3 5.3-26.7 2.3-35.9-7.5s-11.3-24.3-5.3-36.3L92.2 256 3.4 78.3zM120 272L32 448 442.7 272H120zm322.7-32L32 64l88 176H442.7z"/></svg></button>
      </form>
      <div class="error-con" style="display:none;">
          <p>
            Please enter a valid email address.
          </p>
      </div>
    </div>
    <div class="email-form-wrapper successful-submit" style="display: none;">
      <p>
        ${emailProvidedText}
      </p>
    </div>`


  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = chatHTML;
  document.body.appendChild(tempDiv.firstElementChild);
  
  const chatWidth = 580;
  const triggerButton = document.querySelector('.trigger');
  const sendButton = document.querySelector('.send-icon');
  const closeButton = document.querySelector('.close-x');
  const sidebar = document.querySelector('.sidebar');

  const reviewIcons = ['<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M288.8 81.7c3.5-12.8 16.7-20.3 29.5-16.8s20.3 16.7 16.8 29.5l-4.5 16.4c-5.5 20.2-13.9 39.3-24.7 56.9c-3.1 4.9-3.2 11.1-.4 16.2s8.2 8.2 14 8.2H448c17.7 0 32 14.3 32 32c0 11.3-5.9 21.3-14.8 27c-7.2 4.6-9.5 13.9-5.3 21.3c2.6 4.6 4.1 10 4.1 15.7c0 12.4-7 23.1-17.3 28.5c-4.2 2.2-7.3 6.1-8.3 10.8s.1 9.5 3 13.2c4.2 5.4 6.7 12.2 6.7 19.5c0 14.2-9.2 26.3-22.1 30.4c-7.8 2.5-12.4 10.6-10.7 18.6c.5 2.2 .7 4.5 .7 6.9c0 17.7-14.3 32-32 32H294.5c-15.8 0-31.2-4.7-44.4-13.4l-38.5-25.7c-9-6-16.6-13.7-22.4-22.6c-4.9-7.4-14.8-9.4-22.2-4.6s-9.4 14.8-4.6 22.2c8.1 12.3 18.7 23.1 31.4 31.6l38.5 25.7c18.4 12.3 40 18.8 62.1 18.8H384c35.3 0 64-28.7 64-64l0-.6c19.1-11.1 32-31.7 32-55.4c0-8.7-1.8-17.1-4.9-24.7C487.9 323.6 496 306.8 496 288c0-6.5-1-12.8-2.8-18.7C504.8 257.7 512 241.7 512 224c0-35.3-28.7-64-64-64H346.4c6.2-13.1 11.3-26.7 15.1-40.9l4.5-16.4c8.1-29.8-9.5-60.6-39.3-68.8s-60.6 9.5-68.8 39.3l-4.5 16.4c-8.9 32.6-29.6 60.8-58.2 79l-3.1 2c-11.8 7.5-21.7 17.1-29.5 28.2c-5.1 7.2-3.3 17.2 4 22.3s17.2 3.3 22.3-4c5.4-7.7 12.2-14.4 20.4-19.5l3.1-2c35.3-22.4 60.9-57.2 71.9-97.5l4.5-16.4zM32 224H96V448H32V224zM0 224V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z"/></svg>',
                      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M480 256A224 224 0 1 1 32 256a224 224 0 1 1 448 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 232a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm184-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM176 336c-8.8 0-16 7.2-16 16s7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176z"/></svg>',
                      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M288.8 430.3c3.5 12.8 16.7 20.3 29.5 16.8s20.3-16.7 16.8-29.5l-4.5-16.4c-5.5-20.2-13.9-39.3-24.7-56.9c-3.1-4.9-3.2-11.1-.4-16.2s8.2-8.2 14-8.2H448c17.7 0 32-14.3 32-32c0-11.3-5.9-21.3-14.8-27c-7.2-4.6-9.5-13.9-5.3-21.3c2.6-4.6 4.1-10 4.1-15.7c0-12.4-7-23.1-17.3-28.5c-4.2-2.2-7.3-6.1-8.3-10.8s.1-9.5 3-13.2c4.2-5.4 6.7-12.2 6.7-19.5c0-14.2-9.2-26.3-22.1-30.4c-7.8-2.5-12.4-10.6-10.7-18.6c.5-2.2 .7-4.5 .7-6.9c0-17.7-14.3-32-32-32H294.5c-15.8 0-31.2 4.7-44.4 13.4l-38.5 25.7c-9 6-16.6 13.7-22.4 22.6c-4.9 7.4-14.8 9.4-22.2 4.6s-9.4-14.8-4.6-22.2c8.1-12.3 18.7-23.1 31.4-31.6l38.5-25.7c18.4-12.3 40-18.8 62.1-18.8H384c35.3 0 64 28.7 64 64l0 .6c19.1 11.1 32 31.7 32 55.4c0 8.7-1.8 17.1-4.9 24.7C487.9 188.4 496 205.2 496 224c0 6.5-1 12.8-2.8 18.7C504.8 254.3 512 270.3 512 288c0 35.3-28.7 64-64 64H346.4c6.2 13.1 11.3 26.7 15.1 40.9l4.5 16.4c8.1 29.8-9.5 60.6-39.3 68.8s-60.6-9.5-68.8-39.3l-4.5-16.4c-8.9-32.6-29.6-60.8-58.2-79l-3.1-2 8.2-12.9-8.2 12.9c-11.8-7.5-21.7-17.1-29.5-28.2c-5.1-7.2-3.3-17.2 4-22.3s17.2-3.3 22.3 4c5.4 7.7 12.2 14.4 20.4 19.5l3.1 2c35.3 22.4 60.9 57.2 71.9 97.5l4.5 16.4zM32 352H96V128H32V352zM0 352V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"/></svg>']
  const reviewIconsSolid = ['<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>',
                            '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM176.4 176a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM160 336H352c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>',
                            '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"/></svg>']

  setTimeout(function() {      
    let firstClick = true;
    triggerButton.addEventListener('click', () => {
      sidebar.style.right = '0';
      document.querySelector(".user-input").focus();
      if (firstClick) {
        updateMetric("numTriggerClicks");
        firstClick = false;
      }
    });
    closeButton.addEventListener('click', () => {
      sidebar.style.right = '-' + chatWidth + 'px';
    });


    // AI loader indicator HTML template
    function loaderIndicatorGen() {
      let loader = `<div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>`
      return loader;
    }

    // AI RESPONSE AND CHAT LOGIC
    const userInput = document.querySelector(".user-input");
    const messageArea = document.querySelector(".chat-area"); // Where messages will be displayed

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
        const row_index = $(".review-row").length;
        row = `<div class="chat-row-wrapper ${row_index} ${isAI ? "bot": "user"} ${showReview ? "review-row": ""}">
                  <div class="profile">
                      ${isAI ? "": ""}
                  </div>
                  <div class="message-col">
                    <div class="message-content">
                      <p class="message" id=${id}>${text}</p>
                    </div>
                    <div class="review-options">
                      <div class="thumbs-up">${reviewIcons[0]}</div>
                      <div class="neutral">${reviewIcons[1]}</div>
                      <div class="thumbs-down">${reviewIcons[2]}</div>
                    </div>
                  </div>
                </div>
              </div>`;
      } 
      else {
        row = `<div class="chat-row-wrapper ${isAI ? "bot": "user"}">
                  <div class="profile">
                      ${isAI ? "": ""}
                  </div>
                  <p class="message" id=${id}>${text}</p>
                </div>`;
      }
      return row;
    }

    // Function for setting link click action
    function setLinkClickAction() {
      let links = document.querySelectorAll(".awsme-ai-chat .chat-area .link-action");
      if (links.length == 0) {
        return false;
      }
      let newLink = links[links.length-1];
      let action_id = newLink.id;
      newLink.onclick = function() { updateMetric('', 'actions', action_id, 'clicks') };
    }

    // Function for connecting video start action
    let player;
    function setVideoClickAction() {
      let videos= document.querySelectorAll(".awsme-ai-chat .chat-area .video-action");
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
        let iframe = `<div id=${id} class="video-action ${videoId} ${platform}"></div>`;
        return iframe;
      }
      return "";
    }
    
    function responseHTMLModifier(string, className, action_data) {
      let action_id = action_data[0]
      let stringList = string.split("");
      if (action_id.length == 20) {
        let action_url = action_data[1]
        let action_cta = action_data[2]
        let action_type = action_data[3]     
        updateMetric('', 'actions', action_id, 'views');
        let ctaHTML = "";
        if (action_type == "link") {
          ctaHTML = `<a class="${className} link-action cta-callout" id="${action_id}" href="${action_url}" target="_blank">
            <span class="cta-callout-label">${action_cta}</span>
            </a>`
        }
        else if (action_type == "video") {
          ctaHTML = getIframeFromUrl(action_url, action_id);
        }
        if (chatHTML != "") {
          stringList.push(ctaHTML);
        }
        else {
          console.log(action_type);
        }
      }

      let lead_ref = localStorage.getItem('lead_ref') != null ? localStorage.getItem('lead_ref'): "";
      if (lead_ref == "" && askEmail) {
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

    let conversation = "";
    let reviewRefs = [];
    let questionsAndAnswers = [];
    async function getAIResponse(userMessage) {
      userMessage = userMessage.replace("{", "");
      userMessage = userMessage.replace("}", "");
      let lead_stage = localStorage.getItem('lead_stage') != null ? localStorage.getItem('lead_stage'): "";
      let lead_ref = localStorage.getItem('lead_ref') != null ? localStorage.getItem('lead_ref'): "";
      let newMessage = `{user: ${userMessage}}`;
      while (conversation.length + newMessage.length > 3000) {
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
      let crm_ids = localStorage.getItem('crm_ids') != null ? localStorage.getItem('crm_ids'): {};
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
              new_session: new_session,
              crm_ids: crm_ids
          }),
      })
      response = await response.text();
      response = JSON.parse(response);
      let action_data = response.action_data;
      lead_stage = response.lead_stage;
      localStorage.setItem('lead_stage', lead_stage)
      let message = response.response;
      message = message.replace("{", "").replace("}", "").replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '');
      reviewRefs.push("");
      questionsAndAnswers.push({"question": userMessage, "answer": message})
      conversation += `{assistant: ${message}}`;
      
      return [message, action_data];
    }


    // Create new lead in database
    async function createLead(email) {
      let response = await fetch('https://awsme.co/api/create-lead/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: email, 
              messages: conversation,
              user_id: awsmeId
          }),
      })
      response = await response.text();
      response = JSON.parse(response)
      let lead_ref = response.lead_ref;
      if (lead_ref.length > 0) {
          localStorage.setItem('lead_ref', lead_ref)
      }
      let crm_ids = response.crm_ids;
      if (Object.keys(crm_ids).length > 0) {
        localStorage.setItem('crm_ids', crm_ids)
      }
      console.log(response.response)
    }

    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
    
    // Set email capture action
    function setFormAction() {
      let forms = document.querySelectorAll(".email-form");
      if (forms.length > 0) {
        let form = forms[forms.length-1];
        form.addEventListener("submit", function(event) {
          event.preventDefault();
          let email = this.querySelector("input").value;
          if (!isValidEmail(email)) {
            this.parentElement.querySelector(".error-con").style.display = "block";
          }
          else {
            this.parentElement.querySelector(".error-con").style.display = "none";
            createLead(email);
            this.querySelector("input").value = "";
            this.parentElement.parentElement.querySelector(".successful-submit").style.display = "block";
            this.parentElement.remove();
          }
        })
      }
    }


    // Response review saving
    async function saveReview(rating, question, answer, reviewIndex) {
      updateMetric("numRatings");
      if (rating == "Good") {
        updateMetric("numThumbsUp");
      }
      else if (rating == "Okay") {
        updateMetric("numThumbsNeutral");
      }
      else if (rating == "Bad") {
        updateMetric("numThumbsDown");
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
      document.querySelectorAll(".thumbs-up").forEach(function(element) {
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
      document.querySelectorAll(".neutral").forEach(function(element) {
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
      document.querySelectorAll(".thumbs-down").forEach(function(element) {
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
      var elements = document.querySelectorAll('.thumbs-up, .neutral, .thumbs-down');
      elements.forEach(function(element) {
        element.addEventListener('click', function() {
          var icons = element.parentElement.children;
          for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            if (icon.className.includes("thumbs-up")) {
              icon.innerHTML = reviewIcons[0]
            }
            else if (icon.className.includes("neutral")) {
              icon.innerHTML = reviewIcons[1]
            }
            else if (icon.className.includes("thumbs-down")) {
              icon.innerHTML = reviewIcons[2]
            }
          }
          if (element.className.includes("thumbs-up")) {
              element.innerHTML = reviewIconsSolid[0]
            }
            else if (element.className.includes("neutral")) {
              element.innerHTML = reviewIconsSolid[1]
            }
            else if (element.className.includes("thumbs-down")) {
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
      document.querySelector(".user-input").focus();
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
      responseParent.querySelector(".typing-indicator").remove()

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
          firstEngagement = false;
          updateMetric("numEngagements");
      }
      updateMetric("numResponses");
  }

    // First prompt from AI
    let uniqueId = generateUniqueId();
    messageArea.innerHTML += responseRowGen(true, "", uniqueId, false)
    let responseDiv = document.querySelector(`#${uniqueId}`);
    AITextGen(responseDiv, AIFirstGreeting)

    updateMetric("numTriggerViews");
  }, 200)

  $(document).ready(function(){
    $('textarea.user-input').on('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  });

}

awsmeAiChatModule();

// UPDATE METRICS IN FIRESTORE (Must be in global scope)
let clickedActions = [];
async function updateMetric(user_metric="", subcollection="", sub_doc_ref="", sub_metric="") {
  const actionKey = sub_doc_ref + "_" + sub_metric;
  if (clickedActions.includes(actionKey)){
    return false;
  }
  clickedActions.push(actionKey);
  let response = await fetch('https://awsme.co/api/metric/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: awsmeId,
      user_metric: user_metric,
      subcollection: subcollection,
      sub_doc_ref: sub_doc_ref,
      sub_metric: sub_metric
    }),
  })
  response = await response.text();
  let message = JSON.parse(response).response;
  console.log(message);
}
  
