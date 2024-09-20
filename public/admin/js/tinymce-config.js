tinymce.init({
  selector: 'textarea.textarea-mce',
  plugins: 'lists link image table code help wordcount',
  toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image',
  images_upload_url: '/your-upload-handler', // Đường dẫn xử lý upload ảnh trên server

  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    input.onchange = function () {
      var file = this.files[0];
      
      var reader = new FileReader();
      reader.onload = function () {
        var id = 'blobid' + (new Date()).getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        // Gọi callback để thêm ảnh vào dialog của TinyMCE
        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };
    
    input.click();
  },
  images_reuse_filename: true
});
