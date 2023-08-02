import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";


const API_URL = "http://127.0.0.1:8000"; // Replace this with your Flask backend URL
const categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];

function Emailform() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState([]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        firstName,
        lastName,
        email,
        category,
      };
      axios.post(`${API_URL}/register_user`, userData)
        .then((response) => {
          console.log(response.data);
          // Handle successful response here (e.g., show a success message)
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
          // Handle error here (e.g., show an error message)
        });
    };
  
    const handleCategoryChange = (selectedOptions) => {
      setCategory(selectedOptions);
    };

    return (
        <div>
        <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label 
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                    for="grid-first-name">
                    First Name
                </label>
                <input 
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="grid-first-name" 
                    type="text" 
                    placeholder="Jane"/>
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label 
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                    for="grid-last-name">
                    Last Name
                </label>
                <input 
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-last-name" 
                    type="text" 
                    placeholder="Doe"
                />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label 
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        for="grid-password">
                        Email
                    </label>
                    <input 
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-password" 
                        type="password" 
                        placeholder="example@gmail.com"/>
                </div>
            </div>
        </form>
            <form onSubmit={handleSubmit}>
                <label>
                First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                    <Select
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        defaultValue={[{ value: categories[0], label: categories[0] }]}
                        isMulti
                        options={categories.map((category) => ({ value: category, label: category }))}
                        onChange={handleCategoryChange}
                    />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Emailform