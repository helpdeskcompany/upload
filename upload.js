const form = document.getElementById('form-upload');
const upload = document.getElementById('uploaded');
form.addEventListener('submit', e => {
  e.preventDefault();
  const file = form.file.files[0];
  const fr = new FileReader();
  fr.readAsArrayBuffer(file);
  var progressUpload = "Quá trình tải tệp lên, vui lòng đợi...";
  upload.innerHTML = progressUpload;
fr.onload = f => {
  // I added below script.
  let newName = form.filename.value;
  const orgName = file.name;
  if (orgName.includes(".")) {
    const orgExt = orgName.split(".").pop();
    if (orgExt != newName.split(".").pop()) {
      newName = newName ? `${newName}.${orgExt}` : orgName;
    }
  }
  
  const url = idlink;
  
  const qs = new URLSearchParams({filename: newName, mimeType: file.type});  // Modified
  fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)])})
  .then(res => res.json())
  .then(e => upload.innerHTML = '<div class="uk-child-width-1-1 uk-text-center"><p class="center">File upload successful</p><a class="uk-button uk-button-danger" id="linkfile" href="'+e.fileUrl+'" target="_blank" rel="noopener nofollow">View files</a></div>')  // <--- You can retrieve the returned value here.
  .catch(err => console.log(err));
}
});
  $('#kirim-file-upload').click(uploadedFile);
  function uploadedFile() { 
    var walink = 'https://web.whatsapp.com/send'; 
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { 
      var walink = 'whatsapp://send'; 
    } 
    var namaUploaded = '*Họ và tên* : ' + $("#fullname").val();
    var namaFile = '*Tên file* : ' + $("#filename").val();
    var linkFile = '*Link File* : ' + $("#linkfile").attr("href");
    console.log(linkFile)
    var nomorHP = "+84869290076";
    var teksPesan = "Xin chào Wikianow, tôi đã gửi được tập tin, đây là thông tin chi tiết:";
    var kirimFile = walink + '?phone=' + nomorHP + '&text=' + teksPesan + '%0A%0A' + namaUploaded + '%0A' + namaFile + '%0A' + linkFile;
    window.open(kirimFile,'_blank');
  }
