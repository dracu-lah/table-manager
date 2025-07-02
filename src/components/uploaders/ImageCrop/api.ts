export const UploadImageAPI = (ImageUploadURL, file) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("ImageFile", file);

    xhr.open("POST", ImageUploadURL, true);

    xhr.onload = function () {
      if (xhr.status === 201) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Upload failed"));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network error"));
    };

    xhr.send(formData);
  });
};
