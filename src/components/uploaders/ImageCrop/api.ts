import api from "@/configs/axios";

export const UploadImageAPI = async (ImageUploadURL, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(ImageUploadURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    throw new Error(error?.message || "Network error");
  }
};
