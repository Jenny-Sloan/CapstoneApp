import React, { useState } from 'react';
import { Link } from "react-router-dom";
//importing what is needed for this page


function Form() {

    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    //react hooks - Creating a new state variable within this function to add some local state. This returns a pair: the current state value and a function that lets you update it. Lets you use React without classes.


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = JSON.stringify({ name, breed, age })
        await fetch("http://localhost:4000", {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json',
            }
            //Async and await - upon submitting the information, wait for the information to be fetched from the database(local host)
        })
        //Setting up the function to take the information given and post it to the database at the local host 4000
        window.location.replace("http://localhost:3000/puppy");
        //Returns it to the puppy window after you submit the information
    };


    return (
        <div className="App">
            <nav class="navbar navbar-dark bg-dark">
                <h1>FORM</h1>
                <Link to="/puppy">DOGS</Link>
                <Link to="/">HOME</Link>
            </nav>
            {/* Navagation bar at the top of the screen */}
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1"><h3>NAME</h3></label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1"><h3>BREED</h3></label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Breed"
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1"><h3>AGE</h3></label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Age"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                </div>
                {/* Form with Name, Breed and Age to be filled out and with placeholders */}

                <button type="submit" className="btn btn-primary">Submit</button>
                {/* Button to submit the information */}
            </form>
            {/* Full form to be filled out on the page */}
        </div>
    );
}

export default Form;