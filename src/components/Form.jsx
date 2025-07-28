import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    bio: '',
    color: '#3498db'
  });

  const onHandleSubmit = async (e) => {
    e.preventDefault();
  
    const { fullName, jobTitle, bio, color } = formData;
  
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${fullName}'s Portfolio</title>
        <style>
          body {
            font-family: sans-serif;
            padding: 40px;
            background-color: #f9f9f9;
            color: ${color};
          }
          h1 { font-size: 2.5rem; }
          h2 { font-size: 1.5rem; }
          p { font-size: 1rem; margin-top: 1rem; }
        </style>
      </head>
      <body>
        <h1>${fullName}</h1>
        <h2>${jobTitle}</h2>
        <p>${bio}</p>
      </body>
      </html>
    `;
  
    const payload = {
      name: `portfolio-${Date.now()}`,
      files: [
        {
          file: "index.html",
          data: htmlContent,
        }
      ],
      projectSettings: {
        devCommand: null,
        installCommand: null,
        buildCommand: null,
        outputDirectory: ".",
        rootDirectory: null,
        framework: null
      },
      target: "production"
    };
  
    try {
      const response = await fetch("https://api.vercel.com/v13/deployments", {
        method: "POST",
        headers: {
          Authorization: `Bearer cAcIA4rQGhwNnUycWioe7tlp`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("✅ Deployed! URL: https://" + data.url);
        console.log("Deployment result:", data);
      } else {
        console.error("Deployment failed:", data);
        alert("❌ Deployment failed: " + data.error?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("❌ Network or server error during deployment.");
    }
  };
  
  

  const onInputChange = (e) => {
    const input = e.target;
    const fieldName = input.name;
    setFormData({
      ...formData,
      [fieldName]: input.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col md:flex-row gap-6">
      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Portfolio Generator</h2>
        <form onSubmit={onHandleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 font-medium">Full Name</label>
            <input
              onChange={onInputChange}
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-gray-700 font-medium">Job Title</label>
            <input
              onChange={onInputChange}
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-gray-700 font-medium">Short Bio</label>
            <textarea
              onChange={onInputChange}
              id="bio"
              name="bio"
              value={formData.bio}
              rows={4}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="color" className="block text-gray-700 font-medium">Theme Color</label>
            <input
              onChange={onInputChange}
              type="color"
              id="color"
              name="color"
              value={formData.color}
              className="mt-1 h-10 w-20 border-2 border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Deploy to Vercel
          </button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <div className="border border-dashed border-gray-300 p-4 rounded" style={{ color: formData.color }}>
          <h1 className="text-3xl font-bold">{formData.fullName || 'Your Name'}</h1>
          <h2 className="text-xl font-semibold mt-2">{formData.jobTitle || 'Your Title'}</h2>
          <p className="mt-2 text-gray-700">{formData.bio || 'Short bio will appear here.'}</p>
        </div>
      </div>
    </div>
  );
};

export default Form;
