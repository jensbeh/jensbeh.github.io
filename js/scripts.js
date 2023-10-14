// ================================
// == VARIABLES
// ================================
var languageIds = ["en", "de"];
var systemLangauge = navigator.language || navigator.userLanguage;
var systemLangaugeId = systemLangauge.substring(0, systemLangauge.indexOf("-"));
var defaultLangauge = languageIds.indexOf(systemLangaugeId) != -1 ? languageIds[languageIds.indexOf(systemLangaugeId)] : languageIds[0]; // Get system langauge or get default [0]
var languageDict;
// Elements
const scrollToTopButton = document.getElementById("scroll_to_top_button");



// ================================
// == BASICS
// ================================
// Set listeners
window.onscroll = function() {
  scrollFunction();
};

// Called on start
$(document).ready( function() {
  // Setup language and texts in elements
  initLanguage();

  // Set current year
  $("#current_year").text(new Date().getFullYear());
}(jQuery));



// ================================
// == LANGUAGE
// ================================
// Method to load language texts and set texts to elements
function initLanguage() {
  loadLanguageData();
  updateLanguageInElements();
}

// Method to reload language with new key like "de" or "en"
function setLanguage(lang) {
  // Update selected lanuage in browser storage
  localStorage.setItem('language', lang);

  // Reload language and texts
  initLanguage();
}

// Method to load language dict from json file
function loadLanguageData() {
  // Set default language id to browser storage if not set before
  localStorage.getItem('language') == null ? localStorage.setItem('language', defaultLangauge) : false;

  // Load json language file to dict
  $.ajax({ 
    url:  '/jensbeh.github.io//language/' +  localStorage.getItem('language') + '.json', 
    dataType: 'json',
    async: false,
    success: function (lang) {
      languageDict = lang
    }
  });
}

// Method to set the correct texts to elements
function updateLanguageInElements() {  
  // Navigation Bar
  $('#about_text').text(languageDict.about);
  $('#projects_text').text(languageDict.projects);
  $('#skills_text').text(languageDict.skills);

  // About Me
  $('#about_me_text').text(languageDict.about_me);
  $('#about_me_text_text_1').text(languageDict.about_me_text_1);
  $('#about_me_text_text_2').text(languageDict.about_me_text_2);
  $('#about_me_text_text_3').text(languageDict.about_me_text_3);
  $('#about_me_text_text_4').text(languageDict.about_me_text_4);

  // Projects
  $('#my_projects_text').text(languageDict.my_projects);
  // Show Project Button Text
  const show_project_texts = document.querySelectorAll('.show_project_text');
  show_project_texts.forEach((show_project_text) => {
    show_project_text.textContent = languageDict.show_project;
  });
  // Show Server Button Text
  const show_server_texts = document.querySelectorAll('.show_server_text');
  show_server_texts.forEach((show_server_text) => {
    show_server_text.textContent = languageDict.show_server;
  });
  
  // Project Alpha
  $('#project_alpha_text_text').text(languageDict.project_alpha_text);
  // Accord
  $('#accord_client_text_text').text(languageDict.accord_client_text);
  // Android ESP32-Cam
  $('#android_esp32cam_text_text_1').text(languageDict.android_esp32cam_text_1);
  $('#android_esp32cam_text_text_2').text(languageDict.android_esp32cam_text_2);
  
  // My Skills
  $('#my_skills_text').text(languageDict.my_skills);
}



// ================================
// == SCROLL TO TOP
// ================================
// Method to scroll in html to top
function scrollToTop() {
  $('html, body').animate({
    scrollTop: 0
  }, 500);
}

// Method to show scroll to top button if scrolled a little bit down
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}
