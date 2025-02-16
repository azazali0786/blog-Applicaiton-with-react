import axios from 'axios';

const apiURL = 'http://localhost:3000';

export const getBlogs = async (cat) => {
    if(!cat){
        cat='all';
    }
    try {
        const response = await axios.get(`${apiURL}/blog/${cat}`);
        // console.log("Fetched Blogs:", response.data); // Debugging log
        return response.data;  // Ensure the correct return format
    } catch (error) {
        console.error("Error fetching blogs:", error.message);
        return null;  // Return null instead of raw error
    }
};
export const createBlog = (data) => {
    return axios.post(`${apiURL}/blog`, data)
        .then(result => {
            console.log("Raw API Response:", result);
            return result.data; // ✅ Properly returning the response
        })
        .catch(error => {
            console.error("Error creating blog:", error);
            return null; // ✅ Return null to handle errors properly
        });
}; 

export const getBlogbyid = (id) => {
    return axios.get(`${apiURL}/blogbyid/${id}`) // ✅ Use GET instead of POST
        .then(result => {
            console.log("Raw API Response:", result.data);
            return result.data; // ✅ Return the correct response
        })
        .catch(error => {
            console.error("Error fetching blog:", error);
            return null; // ✅ Handle errors properly
        });
};

export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${apiURL}/blogimage`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data && response.data.path) {
            console.log("File uploaded successfully:", response.data.path);
            return response.data; 
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("File upload failed:", error);
        return { path: "" };
    }
};
