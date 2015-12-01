var SvgController = (function() {
	
	var arrowLeft = '<svg class="single-left" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="26px" height="35px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"> <style type="text/css"> .st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style> <g id="Layer_3"> <path d="M6,4l20,12L6,28V4 M6,2C5.7,2,5.3,2.1,5,2.3C4.4,2.6,4,3.3,4,4v24c0,0.7,0.4,1.4,1,1.7C5.3,29.9,5.7,30,6,30 c0.4,0,0.7-0.1,1-0.3l20-12c0.6-0.4,1-1,1-1.7c0-0.7-0.4-1.4-1-1.7L7,2.3C6.7,2.1,6.4,2,6,2L6,2z" transform="translate(15) rotate(59 9 10)"/> </g> <g id="Guides"> </g> </svg>';
	var arrowRight = '<svg class="single-right" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="26px" height="35px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"> <style type="text/css"> .st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style> <g id="Layer_3"> <path d="M6,4l20,12L6,28V4 M6,2C5.7,2,5.3,2.1,5,2.3C4.4,2.6,4,3.3,4,4v24c0,0.7,0.4,1.4,1,1.7C5.3,29.9,5.7,30,6,30 c0.4,0,0.7-0.1,1-0.3l20-12c0.6-0.4,1-1,1-1.7c0-0.7-0.4-1.4-1-1.7L7,2.3C6.7,2.1,6.4,2,6,2L6,2z" transform="translate(-2)"/> </g> <g id="Guides"> </g> </svg>';
	var doubleArrowLeft = '<svg class="double-right" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="10px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"> <style type="text/css"> .st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style> <g id="Layer_3"> <path d="M6,4l20,12L6,28V4 M6,2C5.7,2,5.3,2.1,5,2.3C4.4,2.6,4,3.3,4,4v24c0,0.7,0.4,1.4,1,1.7C5.3,29.9,5.7,30,6,30 c0.4,0,0.7-0.1,1-0.3l20-12c0.6-0.4,1-1,1-1.7c0-0.7-0.4-1.4-1-1.7L7,2.3C6.7,2.1,6.4,2,6,2L6,2z" transform="translate(15) rotate(59 9 10)"/> </g> <g id="Layer_3"> <path d="M6,4l20,12L6,28V4 M6,2C5.7,2,5.3,2.1,5,2.3C4.4,2.6,4,3.3,4,4v24c0,0.7,0.4,1.4,1,1.7C5.3,29.9,5.7,30,6,30 c0.4,0,0.7-0.1,1-0.3l20-12c0.6-0.4,1-1,1-1.7c0-0.7-0.4-1.4-1-1.7L7,2.3C6.7,2.1,6.4,2,6,2L6,2z" transform="translate(40) rotate(59 9 10)"/> </g> <g id="Guides"> </g> </svg>';
	var doubleArrowRight = '<svg class="double-left" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="10px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"> <style type="text/css"> .st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style> <g id="Layer_3"> <path d="M6,4l20,12L6,28V4 M6,2C5.7,2,5.3,2.1,5,2.3C4.4,2.6,4,3.3,4,4v24c0,0.7,0.4,1.4,1,1.7C5.3,29.9,5.7,30,6,30 c0.4,0,0.7-0.1,1-0.3l20-12c0.6-0.4,1-1,1-1.7c0-0.7-0.4-1.4-1-1.7L7,2.3C6.7,2.1,6.4,2,6,2L6,2z" transform="translate(-20)"/> </g> <g id="Layer_3"> <path d="M6,4l20,12L6,28V4 M6,2C5.7,2,5.3,2.1,5,2.3C4.4,2.6,4,3.3,4,4v24c0,0.7,0.4,1.4,1,1.7C5.3,29.9,5.7,30,6,30 c0.4,0,0.7-0.1,1-0.3l20-12c0.6-0.4,1-1,1-1.7c0-0.7-0.4-1.4-1-1.7L7,2.3C6.7,2.1,6.4,2,6,2L6,2z" transform="translate(5)"/> </g> <g id="Guides"> </g> </svg>';
	var options = '<svg class="options-btn" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32; width: 20px; float: left; margin-top: 3px; margin-right: 5px" xml:space="preserve"> <style type="text/css"> .st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style> <g id="Layer_3"> <g> <g> <path d="M17,4c0.6,0,1,0.4,1,1v1.2c1.3,0.3,2.4,0.8,3.5,1.5l0.9-0.9c0.2-0.2,0.5-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3l1.4,1.4 c0.4,0.4,0.4,1,0,1.4l-0.9,0.9c0.7,1,1.2,2.2,1.5,3.5H27c0.6,0,1,0.4,1,1v2c0,0.6-0.4,1-1,1h-1.2c-0.3,1.3-0.8,2.4-1.5,3.5 l0.9,0.9c0.4,0.4,0.4,1,0,1.4l-1.4,1.4c-0.2,0.2-0.5,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3l-0.9-0.9c-1,0.7-2.2,1.2-3.5,1.5V27 c0,0.6-0.4,1-1,1h-2c-0.6,0-1-0.4-1-1v-1.2c-1.3-0.3-2.4-0.8-3.5-1.5l-0.9,0.9c-0.2,0.2-0.5,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3 l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4l0.9-0.9c-0.7-1-1.2-2.2-1.5-3.5H5c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h1.2 c0.3-1.3,0.8-2.4,1.5-3.5L6.8,9.6c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.2-0.2,0.5-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3l0.9,0.9 c1-0.7,2.2-1.2,3.5-1.5V5c0-0.6,0.4-1,1-1H17 M17,2h-2c-1.5,0-2.8,1.2-3,2.7c-0.4,0.1-0.8,0.3-1.2,0.5c-0.5-0.4-1.2-0.7-1.9-0.7 c-0.8,0-1.6,0.3-2.1,0.9L5.4,6.8C4.8,7.4,4.5,8.1,4.5,8.9c0,0.7,0.2,1.4,0.7,1.9C5,11.2,4.8,11.6,4.7,12C3.2,12.2,2,13.4,2,15v2 c0,1.6,1.2,2.8,2.7,3c0.1,0.4,0.3,0.8,0.5,1.2c-0.4,0.5-0.7,1.2-0.7,1.9c0,0.8,0.3,1.6,0.9,2.1l1.4,1.4c0.6,0.6,1.3,0.9,2.1,0.9 c0.7,0,1.4-0.2,1.9-0.7c0.4,0.2,0.8,0.4,1.2,0.5c0.2,1.5,1.4,2.7,3,2.7h2c1.5,0,2.8-1.2,3-2.7c0.4-0.1,0.8-0.3,1.2-0.5 c0.5,0.4,1.2,0.7,1.9,0.7c0.8,0,1.6-0.3,2.1-0.9l1.4-1.4c0.6-0.6,0.9-1.3,0.9-2.1c0-0.7-0.2-1.4-0.7-1.9c0.2-0.4,0.4-0.8,0.5-1.2 c1.5-0.2,2.7-1.4,2.7-3v-2c0-1.6-1.2-2.8-2.7-3c-0.1-0.4-0.3-0.8-0.5-1.2c0.4-0.5,0.7-1.2,0.7-1.9c0-0.8-0.3-1.6-0.9-2.1 l-1.4-1.4c-0.6-0.6-1.3-0.9-2.1-0.9c-0.7,0-1.4,0.2-1.9,0.7C20.8,5,20.4,4.8,20,4.7C19.8,3.2,18.5,2,17,2L17,2z"/> </g> <g> <path d="M16,22.5c-3.6,0-6.5-2.9-6.5-6.5s2.9-6.5,6.5-6.5s6.5,2.9,6.5,6.5S19.6,22.5,16,22.5z M16,10.5c-3,0-5.5,2.5-5.5,5.5 s2.5,5.5,5.5,5.5c3,0,5.5-2.5,5.5-5.5S19,10.5,16,10.5z"/> </g> <g> <path d="M16,19.5c-1.9,0-3.5-1.6-3.5-3.5s1.6-3.5,3.5-3.5c1.9,0,3.5,1.6,3.5,3.5S17.9,19.5,16,19.5z M16,13.5 c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5c1.4,0,2.5-1.1,2.5-2.5S17.4,13.5,16,13.5z"/> </g> </g> </g> <g id="Guides"> </g> </svg>'
	
	var archive = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style><g id="Layer_3"><g><path class="st0" d="M28,3H4C2.4,3,1,4.3,1,6v1c0,1.3,0.8,2.4,2,2.8V27c0,1.1,0.9,2,2,2H27c1.1,0,2-0.9,2-2V9.8c1.1-0.4,2-1.5,2-2.8V6C31,4.3,29.6,3,28,3z M3,6c0-0.6,0.4-1,1-1h24c0.5,0,1,0.5,1,1v1c0,0.5-0.4,1-0.9,1c0,0,0,0,0,0H4c0,0,0,0,0,0C3.5,8,3,7.6,3,7V6z M5,27V10h22v17L5,27z"/><path class="st0" d="M19,13h-6c-0.6,0-1,0.5-1,1c0,0.6,0.4,1,1,1h6c0.6,0,1-0.5,1-1C20,13.4,19.5,13,19,13z"/></g></g><g id="Guides"></g></svg>';
	var trash = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g id="Layer_3"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M25.5,4.2h-7c0-0.6-0.4-1-1-1h-4c-0.6,0-1,0.4-1,1h-6c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h0.1c0,0.2-0.1,0.3-0.1,0.5v17c0,1.7,1.3,3,3,3h13c1.7,0,3-1.3,3-3v-17c0-0.2,0-0.3-0.1-0.5h0.1c0.6,0,1-0.4,1-1v-2C26.5,4.7,26.1,4.2,25.5,4.2z M23.5,8.8v17c0,0.6-0.4,1-1,1h-13c-0.6,0-1-0.4-1-1v-17c0-0.2,0.1-0.4,0.2-0.5h14.7C23.4,8.4,23.5,8.6,23.5,8.8z"/><rect x="12" y="11.2" fill-rule="evenodd" clip-rule="evenodd" width="1" height="13"/><rect x="15.5" y="11.2" fill-rule="evenodd" clip-rule="evenodd" width="1" height="13"/><rect x="19" y="11.2" fill-rule="evenodd" clip-rule="evenodd" width="1" height="13"/></g></g><g id="Guides"></g></svg>';
	
	var close = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style><g id="Layer_3"><path d="M23.6,5c0.3,0,0.6,0.1,0.8,0.3l2.3,2.3c0.4,0.4,0.4,1.1,0,1.5L19.8,16l6.9,6.9c0.4,0.4,0.4,1.1,0,1.5l-2.3,2.3c-0.2,0.2-0.5,0.3-0.8,0.3c-0.3,0-0.6-0.1-0.8-0.3L16,19.8l-6.9,6.9C8.9,26.9,8.6,27,8.4,27c-0.3,0-0.6-0.1-0.8-0.3l-2.3-2.3c-0.4-0.4-0.4-1.1,0-1.5l6.9-6.9L5.3,9.1C4.9,8.7,4.9,8,5.3,7.6l2.3-2.3C7.8,5.1,8.1,5,8.4,5c0.3,0,0.6,0.1,0.8,0.3l6.9,6.9l6.9-6.9C23.1,5.1,23.4,5,23.6,5 M23.6,3c-0.8,0-1.6,0.3-2.2,0.9L16,9.4l-5.5-5.5C10,3.3,9.2,3,8.4,3C7.5,3,6.8,3.3,6.2,3.9L3.9,6.2c-1.2,1.2-1.2,3.2,0,4.4L9.4,16l-5.5,5.5C3.3,22,3,22.8,3,23.6c0,0.8,0.3,1.6,0.9,2.2l2.3,2.3C6.8,28.7,7.5,29,8.4,29c0.8,0,1.6-0.3,2.2-0.9l5.5-5.5l5.5,5.5c0.6,0.6,1.4,0.9,2.2,0.9c0.8,0,1.6-0.3,2.2-0.9l2.3-2.3c0.6-0.6,0.9-1.4,0.9-2.2c0-0.8-0.3-1.6-0.9-2.2L22.6,16l5.5-5.5c1.2-1.2,1.2-3.2,0-4.4l-2.3-2.3C25.2,3.3,24.5,3,23.6,3L23.6,3z"/></g><g id="Guides"></g></svg>';
	var confirm = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 36 36" style="enable-background:new 0 0 36 36;" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style><g id="Layer_3"><path d="M27.9,8c0.3,0,0.5,0.1,0.7,0.3l2.1,2.1c0.4,0.4,0.4,1,0,1.4l-15.9,16c-0.2,0.2-0.4,0.3-0.7,0.3c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c-0.2,0-0.5-0.1-0.7-0.3l-8-8.1c-0.4-0.4-0.4-1,0-1.4l2.1-2.1c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3l5.3,5.3L27.2,8.3C27.4,8.1,27.7,8,27.9,8 M11.9,29.1c0.6,0.6,1.3,0.9,2.1,0.9c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.8,0,1.5-0.3,2.1-0.9l15.9-16c0.6-0.6,0.9-1.3,0.9-2.1c0-0.8-0.3-1.6-0.9-2.1L30,6.9C29.5,6.3,28.7,6,27.9,6l0,0c-0.8,0-1.5,0.3-2.1,0.9L14.1,18.6l-3.9-3.9c-0.6-0.6-1.3-0.9-2.1-0.9c-0.8,0-1.5,0.3-2.1,0.9l-2.1,2.1C3.3,17.4,3,18.1,3,18.9c0,0.8,0.3,1.5,0.9,2.1L11.9,29.1z"/></g><g id="Guides"></g></svg>';
	
	var home = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style><g id="Layer_3"><g><path d="M17.9,25v5c0,1.1,0.9,2,2,2h7c1.7,0,3-1.3,3-3V17.6c0.8-0.3,1.4-0.9,1.7-1.6c0.3-0.8,0.7-2-1.1-3.7l-12-11.1C18.3,0.9,17.4,0,16,0c-1.4,0-2.3,0.9-2.6,1.2l-12,11.1C-0.4,14,0,15.2,0.3,16c0.3,0.7,0.9,1.3,1.7,1.6V29c0,1.7,1.4,3,3,3h7c1.1,0,2-0.9,2-2v-5H17.9z M13.3,23c-0.7,0-1.3,0.5-1.3,1.2V30h-7c-0.6,0-1-0.4-1-1V16l0,0c-1.7,0-2.3-1.2-1.2-2.3C3.9,12.6,13.8,3.6,14.7,2.7C15.2,2.3,15.6,2,16,2c0.4,0,0.8,0.3,1.3,0.7c1,0.9,10.8,10,11.9,11.1c1,1,0.5,2.3-1.2,2.3l0,0v13c0,0.6-0.5,1-1,1h-7v-5.8c0-0.7-0.6-1.2-1.3-1.2H13.3z"/><path d="M16.3,4.1c-0.2-0.2-0.5-0.2-0.7,0l-11,10c-0.2,0.2-0.2,0.5,0,0.7c0.2,0.2,0.5,0.2,0.7,0L16,5.2l10.7,9.7C26.8,15,26.9,15,27,15c0.1,0,0.3-0.1,0.4-0.2c0.2-0.2,0.2-0.5,0-0.7L16.3,4.1z"/></g></g><g id="Guides"></g></svg>';
	var search = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style><g id="Layer_3"><g><path class="st0" d="M12,4.5c-4.1,0-7.5,3.4-7.5,7.5c0,0.3,0.2,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5c0-3.6,2.9-6.5,6.5-6.5c0.3,0,0.5-0.2,0.5-0.5C12.5,4.7,12.3,4.5,12,4.5z"/><path class="st0" d="M31.6,28.8l-7.3-7.3c-0.4-0.4-1.2-0.5-1.8-0.1l-1.4-1.6c0,0,0,0,0,0c4-4.7,3.8-11.8-0.7-16.2c-4.7-4.7-12.3-4.7-17,0c-4.7,4.7-4.7,12.3,0,17c4.4,4.4,11.5,4.7,16.2,0.6c0,0,0,0,0,0l1.6,1.4c-0.3,0.7-0.3,1.4,0.1,1.8l7.3,7.3c0.6,0.6,1.7,0.4,2.5-0.4C32.1,30.5,32.2,29.4,31.6,28.8z M19.1,19.1C15.1,23,8.8,23,4.9,19.1C1,15.2,1,8.8,4.9,4.9C8.8,1,15.2,1,19.1,4.9C23,8.8,23,15.1,19.1,19.1z"/></g></g><g id="Guides"></g></svg>';
	var add = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" style="enable-background:new 0 0 36 36;" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}.st1{fill:#FFFFFF;}</style><g id="Layer_3"><path d="M19.2,6C19.6,6,20,6.5,20,7v9h9c0.6,0,1,0.4,1,0.8l0,2.4c0,0.4-0.4,0.8-1,0.8h-9v9c0,0.6-0.4,1-0.8,1h-2.4c-0.4,0-0.8-0.4-0.8-1v-9H7c-0.6,0-1-0.4-1-0.8v-2.4C6,16.3,6.5,16,7,16h9V7c0-0.6,0.4-1,0.8-1H19.2 M19.2,4h-2.4C15.3,4,14,5.3,14,7v7H7c-1.7,0-3,1.3-3,2.8v2.4C4,20.7,5.3,22,7,22h7v7c0,1.7,1.3,3,2.8,3h2.4c1.5,0,2.8-1.3,2.8-3v-7h7c0.8,0,1.6-0.3,2.2-0.9c0.5-0.5,0.8-1.2,0.8-1.9l0-2.4c0-1.5-1.3-2.8-3-2.8h-7V7C22,5.3,20.7,4,19.2,4L19.2,4z"/></g><g id="Guides"></g></svg>';
	
	function getSvgElement(svg) {
		var el = document.createElement(svg.element);
		el.setAttribute('class', svg.className);
		el.innerHTML = svg.path;
		return el;
	}

	function getArrowLeft () {
		return {
			element: 'td',
			className: 'decr-btn',
			path: arrowLeft
		}
	}

	function getArrowRight () {
		return {
			element: 'td',
			className: 'incr-btn',
			path: arrowRight
		}
	}

	function getDoubleArrowLeft () {
		return {
			element: 'td',
			className: 'double-decr-btn',
			path: doubleArrowLeft
		}
	}

	function getDoubleArrowRight () {
		return {
			element: 'td',
			className: 'double-incr-btn',
			path: doubleArrowRight
		}
	}

	function getOptions () {
		return {
			element: 'svg',
			className: 'options',
			path: options
		}
	}

	function getArchive () {
		return {
			element: 'svg',
			className: 'archive',
			path: archive
		}
	}

	function getTrash () {
		return {
			element: 'svg',
			className: 'trash',
			path: trash
		}
	}

	function getClose () {
		return {
			element: 'svg',
			className: 'close',
			path: close
		}
	}

	function getConfirm () {
		return {
			element: 'svg',
			className: 'confirm',
			path: confirm
		}
	}

	function getHome () {
		return {
			element: 'svg',
			path: home
		}
	}

	function getSearch () {
		return {
			element: 'svg',
			path: search
		}
	}

	function getAdd () {
		return {
			element: 'svg',
			className: 'add',
			path: add
		}
	}


	return {
		getSvgElement: getSvgElement,
		getArrowLeft: getArrowLeft,
		getArrowRight: getArrowRight,
		getDoubleArrowLeft: getDoubleArrowLeft,
		getDoubleArrowRight: getDoubleArrowRight,
		getOptions: getOptions,
		getArchive: getArchive,
		getTrash: getTrash,
		getConfirm: getConfirm,
		getClose: getClose,
		getHome: getHome,
		getSearch: getSearch,
		getAdd: getAdd
	}

})();


var StorageController = (function() {

	function setStorage(r, fn) {
		chrome.storage.sync.set(_getJson(r), function() {
			if (fn && typeof(fn) === typeof(Function)) {
				fn();
			}
		});
	}

	function _getJson(r) {
		var selectedValues = JSON.stringify({
				'tvsName': r.tvsName,
				'tvsId': r.tvsId,
				'episodeNumber': parseInt(r.episodeNumber),
				'seasonNumber': parseInt(r.seasonNumber),
				'episodeName': r.episodeName,
				'seasEpisodes': r.seasEpisodes,
				'leftToSee': r.leftToSee,
				'episodeAirdate': r.episodeAirdate,
				'tvsStatus': r.tvsStatus,
				'seasFinished': r.seasFinished,
				'tvsFinished': r.tvsFinished,
				'subtitles': r.subtitles,
				'torrent': r.torrent,
				'streaming': r.streaming,
				'additionDate': r.additionDate
		});
		// console.log(r.additionDate)

		var jsonfile = {};
		jsonfile[r.tvsId] = selectedValues;
		return jsonfile;
	}

	return {
		setStorage: setStorage
	}

})();

var ScrollController = (function() {
	function getScroll() {
		scroll = localStorage.getItem('scroll');
		localStorage.removeItem('scroll');
		return scroll;
	}

	function setScroll() {
		localStorage.setItem('scroll', document.body.scrollTop);
	}

	return {
		getScroll: getScroll,
		setScroll: setScroll
	}
})();

var DateController = (function() {
	function _getShortMonth(month) {
		if (month < 1 || month > 12) {
			console.log("Month Number Exception");
			return;
		}

		shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		return shortMonth[month-1];
	}

	function _translateTime(daysNumber) {
		var absDaysNumber = Math.abs(daysNumber)
		var sentence = '';
		if (absDaysNumber < 7) {
			dayWord = absDaysNumber == 1 ? ' day' : ' days';
			sentence = absDaysNumber == 0 ? 'today' : absDaysNumber + dayWord;
		} else if (Math.floor(absDaysNumber/7) < 4) {
			var weeksNumber = Math.floor(absDaysNumber / 7);
			var weekWord = weeksNumber == 1 ? ' week' : ' weeks';
			var sentence = weeksNumber + weekWord;
			if (absDaysNumber % 7 != 0) {
				sentence = '> ' + sentence;
			}
		} else {
			sentence = '> 1 month';
		}

		if (daysNumber < 0) {
			return 'In ' + sentence;
		} else if (daysNumber > 0) {
			return sentence + ' ago';
		}
		return sentence;
	}

	function getDaysDifference(episodeAirDate) {
		var today = new Date();
        var episodeAirDate = episodeAirDate.split('-');
        episodeAirDate = new Date(episodeAirDate[0], episodeAirDate[1]-1, episodeAirDate[2]);
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var diff = Math.round((today - episodeAirDate)/((1000*60*60*24)));
		return _translateTime(diff);
	}

	function getConvertedDate(date) {
		// date format: 2015-10-31
		year = date.substring(0, 4);
		month = _getShortMonth(date.substring(5, 7));
		day = date.substring(8, 10)
		return day + " " + month + " " + year;
	}

	return {
		getConvertedDate: getConvertedDate,
		getDaysDifference: getDaysDifference
	}
})();

var SortController = (function() {

	function sort(items, keys, fieldName) {
	    var sorting = getSorting(fieldName)
	    console.log(sorting)
		var tvs = new Array();
		if (keys != null) {
			for (var i = 0; i < keys.length; i++) {
			    tvs[i] = JSON.parse(items[keys[i]]);
			}
			
		} else {
			tvs = items;
		}

	    if (sorting == 'alphabetical') {
            tvs.sort(function(a, b) {
            	if (a.tvsName) {
                	return (a.tvsName).localeCompare(b.tvsName);
            	} else {
            		return (a.name).localeCompare(b.name);
            	}
            });
        } else if (sorting == 'popularity') {
            tvs.sort(function(a, b) {
                return parseFloat(b.popularity) - parseFloat(a.popularity);
            });
        } else if (sorting == 'lastaired') {
            tvs.sort(function(a, b) {
                a = new Date(a.episodeAirdate);
                b = new Date(b.episodeAirdate);
                return b > a;
            });
        } else if (sorting == 'year') {
			tvs.sort(function(a, b) {
				return parseInt(b.year) - parseInt(a.year);
			});
		} else if (sorting == 'chronological') {
			tvs.sort(function(a, b) {
				return b.additionDate > a.additionDate;
			});
		}
    	return tvs;
	}

	function toggleSorting(fieldName, currentSorting, justChangeGraphics) {
		// if (!justChangeGraphics) {
		// 	console.log('1')
		// 	if (currentSorting != null) {
		// 		console.log('2')
		// 		localStorage.setItem(fieldName, sorting) 
		// 		// setSorting(fieldName, sorting);
		// 		sorting = currentSorting;
		// 		console.log(" aaa " + getSorting(fieldName))
		// 	} else {
		// 		console.log('3')
		// 		sorting = getSorting(fieldName)
		// 		console.log(sorting)
		// 	}
		// } else {
		// 	console.log('4')
		// 	sorting = currentSorting;
		// }

		var sorting;
		if (currentSorting != null && !justChangeGraphics) {
			if (!justChangeGraphics) {
				setSorting(fieldName, currentSorting);
			}
			sorting = currentSorting;
		} else if (currentSorting == null) {
			sorting = getSorting(fieldName);
		} else if (justChangeGraphics) {
			sorting = currentSorting;
		}
		
		var sortingButtons = document.getElementsByClassName('sorting');
        var btn;

        if (sorting == 'alphabetical') {
        	btn = document.getElementById('alphabetical');
        } else if (sorting == 'popularity') {
        	btn = document.getElementById('popularity');
        } else if (sorting == 'lastaired') {
        	btn = document.getElementById('lastaired');
        } else if (sorting == 'year') {
        	btn = document.getElementById('year');
        } else if (sorting == 'chronological') {
        	btn = document.getElementById('chronological');
        }

        for (var i = 0; i < sortingButtons.length; i++) {
        	sortingButtons[i].className += !sortingButtons[i].className.match(/(?:^|\s)link(?!\S)/) ? ' link' : '';
        } 
        btn.className = btn.className.replace( /(?:^|\s)link(?!\S)/g , '');
    }

    function setSorting(fieldName, sorting) {
        localStorage.setItem(fieldName, sorting);
    }

    function getSorting(fieldName) {
    	// var alternativeSorting;
    	// if (fieldName == 'sortingResults') {
    	// 	alternativeSorting = 'popularity';
    	// } else if (fieldName == 'sortingMainpage') {
    	// 	alternativeSorting = 'alphabetical';
    	// }

    	// var sorting = localStorage.getItem(fieldName);

    	// if (sorting == 'undefined') {
    	// 	setSorting(fieldName, alternativeSorting);
    	// 	sorting = alternativeSorting;
    	// }

		// return sorting;
		return localStorage.getItem(fieldName)
    }

    return {
    	sort: sort,
    	toggleSorting: toggleSorting,
    	setSorting: setSorting,
    	getSorting: getSorting
    }
})();