(function (window, undefined) {
  'use strict';

  // Design By
  // - https://dribbble.com/shots/13992184-File-Uploader-Drag-Drop

  // Select Upload-Area
  const uploadArea = document.querySelector('#uploadArea')

  // Select Drop-Zoon Area
  const dropZoon = document.querySelector('#dropZoon');

  // Loading Text
  const loadingText = document.querySelector('#loadingText');

  // Slect File Input
  const fileInput = document.querySelector('#fileInput');

  // Select Preview Image
  const previewImage = document.querySelector('#previewImage');

  // File-Details Area
  const fileDetails = document.querySelector('#fileDetails');

  // Uploaded File
  const uploadedFile = document.querySelector('#uploadedFile');

  // Uploaded File Info
  const uploadedFileInfo = document.querySelector('#uploadedFileInfo');

  // Uploaded File  Name
  const uploadedFileName = document.querySelector('.uploaded-file__name');

  // Uploaded File Icon
  const uploadedFileIconText = document.querySelector('.uploaded-file__icon-text');

  // Uploaded File Counter
  const uploadedFileCounter = document.querySelector('.uploaded-file__counter');

  // ToolTip Data
  const toolTipData = document.querySelector('.upload-area__tooltip-data');

  // Images Types
  const imagesTypes = [
    "jpeg",
    "png",
    "svg",
    "gif"
  ];

  // Append Images Types Array Inisde Tooltip Data
  toolTipData.innerHTML = [...imagesTypes].join(', .');

  // When (drop-zoon) has (dragover) Event
  dropZoon.addEventListener('dragover', function (event) {
    // Prevent Default Behavior
    event.preventDefault();

    // Add Class (drop-zoon--over) On (drop-zoon)
    dropZoon.classList.add('drop-zoon--over');
  });

  // When (drop-zoon) has (dragleave) Event
  dropZoon.addEventListener('dragleave', function (event) {
    // Remove Class (drop-zoon--over) from (drop-zoon)
    dropZoon.classList.remove('drop-zoon--over');
  });

  // When (drop-zoon) has (drop) Event
  dropZoon.addEventListener('drop', function (event) {
    // Prevent Default Behavior
    event.preventDefault();

    // Remove Class (drop-zoon--over) from (drop-zoon)
    dropZoon.classList.remove('drop-zoon--over');

    // Select The Dropped File
    const file = event.dataTransfer.files[0];

    // Call Function uploadFile(), And Send To Her The Dropped File :)
    uploadFile(file);
  });

  // When (drop-zoon) has (click) Event
  dropZoon.addEventListener('click', function (event) {
    // Click The (fileInput)
    fileInput.click();
  });

  // When (fileInput) has (change) Event
  fileInput.addEventListener('change', function (event) {
    // Select The Chosen File
    const file = event.target.files[0];

    // Call Function uploadFile(), And Send To Her The Chosen File :)
    uploadFile(file);
  });

  // Upload File Function
  function uploadFile(file) {
    // FileReader()
    const fileReader = new FileReader();
    // File Type
    const fileType = file.type;
    // File Size
    const fileSize = file.size;

    // If File Is Passed from the (File Validation) Function
    if (fileValidate(fileType, fileSize)) {
      // Add Class (drop-zoon--Uploaded) on (drop-zoon)
      dropZoon.classList.add('drop-zoon--Uploaded');

      // Show Loading-text
      loadingText.style.display = "block";
      // Hide Preview Image
      previewImage.style.display = 'none';

      // Remove Class (uploaded-file--open) From (uploadedFile)
      uploadedFile.classList.remove('uploaded-file--open');
      // Remove Class (uploaded-file__info--active) from (uploadedFileInfo)
      uploadedFileInfo.classList.remove('uploaded-file__info--active');

      // After File Reader Loaded
      fileReader.addEventListener('load', function () {
        // After Half Second
        setTimeout(function () {
          // Add Class (upload-area--open) On (uploadArea)
          uploadArea.classList.add('upload-area--open');

          // Hide Loading-text (please-wait) Element
          loadingText.style.display = "none";
          // Show Preview Image
          previewImage.style.display = 'block';

          // Add Class (file-details--open) On (fileDetails)
          fileDetails.classList.add('file-details--open');
          // Add Class (uploaded-file--open) On (uploadedFile)
          uploadedFile.classList.add('uploaded-file--open');
          // Add Class (uploaded-file__info--active) On (uploadedFileInfo)
          uploadedFileInfo.classList.add('uploaded-file__info--active');
        }, 500); // 0.5s

        // Add The (fileReader) Result Inside (previewImage) Source
        previewImage.setAttribute('src', fileReader.result);

        // Add File Name Inside Uploaded File Name
        uploadedFileName.innerHTML = file.name;

        // Call Function progressMove();
        progressMove();
      });

      // Read (file) As Data Url
      fileReader.readAsDataURL(file);
    } else { // Else

      this; // (this) Represent The fileValidate(fileType, fileSize) Function

    };
  };

  // Progress Counter Increase Function
  function progressMove() {
    // Counter Start
    let counter = 0;

    // After 600ms
    setTimeout(() => {
      // Every 100ms
      let counterIncrease = setInterval(() => {
        // If (counter) is equle 100
        if (counter === 100) {
          // Stop (Counter Increase)
          clearInterval(counterIncrease);
        } else { // Else
          // plus 10 on counter
          counter = counter + 10;
          // add (counter) vlaue inisde (uploadedFileCounter)
          uploadedFileCounter.innerHTML = `${counter}%`
        }
      }, 100);
    }, 600);
  };


  // Simple File Validate Function
  function fileValidate(fileType, fileSize) {
    // File Type Validation
    let isImage = imagesTypes.filter((type) => fileType.indexOf(`image/${type}`) !== -1);

    // If The Uploaded File Type Is 'jpeg'
    if (isImage[0] === 'jpeg') {
      // Add Inisde (uploadedFileIconText) The (jpg) Value
      uploadedFileIconText.innerHTML = 'jpg';
    } else { // else
      // Add Inisde (uploadedFileIconText) The Uploaded File Type
      uploadedFileIconText.innerHTML = isImage[0];
    };

    // If The Uploaded File Is An Image
    if (isImage.length !== 0) {
      // Check, If File Size Is 2MB or Less
      if (fileSize <= 2000000) { // 2MB :)
        return true;
      } else { // Else File Size
        return alert('Please Your File Should be 2 Megabytes or Less');
      };
    } else { // Else File Type
      return alert('Please make sure to upload An Image File Type');
    };
  };


  const editorInstance = SUNEDITOR.create('editor_classic', {
    display: 'block',
    width: '100%',
    height: 'auto',
    popupDisplay: 'full',
    charCounter: true,
    charCounterLabel: 'Characters :',
    imageGalleryUrl: 'https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo',
    buttonList: [
      // default
      ['undo', 'redo'],
      ['font', 'fontSize', 'formatBlock'],
      ['paragraphStyle', 'blockquote'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor', 'textStyle'],
      ['removeFormat'],
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'lineHeight'],
      ['table', 'link', 'image', 'video', 'audio', 'math'],
      ['imageGallery'],
      ['fullScreen', 'showBlocks', 'codeView'],
      ['preview', 'print'],
      ['save', 'template'],
      // (min-width: 1546)
      ['%1546', [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio', 'math'],
        ['imageGallery'],
        ['fullScreen', 'showBlocks', 'codeView'],
        ['-right', ':i-More Misc-default.more_vertical', 'preview', 'print', 'save', 'template']
      ]],
      // (min-width: 1455)
      ['%1455', [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio', 'math'],
        ['imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
      ]],
      // (min-width: 1326)
      ['%1326', [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
        ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'math', 'imageGallery']
      ]],
      // (min-width: 1123)
      ['%1123', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
        ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'math', 'imageGallery']
      ]],
      // (min-width: 817)
      ['%817', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike'],
        [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
        ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'math', 'imageGallery']
      ]],
      // (min-width: 673)
      ['%673', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'math', 'imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
      ]],
      // (min-width: 525)
      ['%525', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
        [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'math', 'imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
      ]],
      // (min-width: 420)
      ['%420', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
        [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
        [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'math', 'imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
      ]]
    ],
    placeholder: 'Start typing something...',
    templates: [
      {
        name: 'Template-1',
        html: '<p>HTML source1</p>'
      },
      {
        name: 'Template-2',
        html: '<p>HTML source2</p>'
      }
    ],
    codeMirror: CodeMirror,
    katex: katex
  });

  SUNEDITOR.create('editor_inline1', {
    mode: 'inline',
    display: 'block',
    width: '100%',
    height: '162',
    popupDisplay: 'full',
    buttonList: [
      ['bold', 'underline', 'align', 'horizontalRule', 'list', 'table', 'codeView']
    ],
    placeholder: 'Start typing something...'
  });
  SUNEDITOR.create('editor_inline2', {
    mode: 'inline',
    display: 'block',
    width: '100%',
    height: '204',
    popupDisplay: 'full',
    buttonList: [
      ['font', 'fontSize', 'formatBlock', 'link'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['codeView']
    ],
    placeholder: 'Start typing something...'
  });
  SUNEDITOR.create('editor_inline3', {
    mode: 'inline',
    display: 'block',
    width: '100%',
    height: 'auto',
    popupDisplay: 'full',
    buttonList: [
      ['link', 'image', 'video']
    ],
    placeholder: 'Start typing something...'
  });

  SUNEDITOR.create('editor_balloon', {
    mode: 'balloon',
    display: 'block',
    width: '100%',
    height: 'auto',
    popupDisplay: 'full',
    buttonList: [
      ['fontSize', 'fontColor', 'bold', 'underline', 'align', 'horizontalRule', 'table', 'codeView']
    ],
    placeholder: 'Start typing something...'
  });

  SUNEDITOR.create('editor_balloon_always', {
    mode: 'balloon-always',
    display: 'block',
    width: '100%',
    height: 'auto',
    popupDisplay: 'full',
    buttonList: [
      ['bold', 'italic', 'link', 'undo', 'redo']
    ],
    placeholder: 'Start typing something...'
  });


  function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }


  // :)

  /*
  NOTE:
  ------
  PLACE HERE YOUR OWN JAVASCRIPT CODE IF NEEDED
  WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR JAVASCRIPT CODE PLEASE CONSIDER WRITING YOUR SCRIPT HERE.  */

})(window);
