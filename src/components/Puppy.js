import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

//set up - same as the form to fill out
function Dogs() {
    const [dogs, setDogs] = useState([]);
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [idState, setId] = useState("");

    const fetchDogs = () => fetch("https://aqueous-chamber-71008.herokuapp.com/")
        .then(response => response.json())
        .then(dogs => setDogs(dogs))

    useEffect(() => {
        fetchDogs()
    }, [])

    const handleForm = (dog) => {
        setName(dog.name)
        setBreed(dog.breed)
        setAge(dog.age)
        setId(dog._id)
    }//setting state
    //bringing in the dog properties. dog._id is coming from the database - using props

    const handleEdit = async (e, id) => {
        e.preventDefault()
        const update = JSON.stringify({ name, breed, age })
        await fetch("https://aqueous-chamber-71008.herokuapp.com/" + id, {
            method: "PUT",
            body: update,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //all the things needed for the database

        fetchDogs()
        //hitting the database - the get request. refreshing the data on the screen for those to see the new info
        document.querySelector('.close').click();
    }
    //it will close the window once its all been updated by selecting the element with the 'close' classname. This is calling to the modal in the bootstrap button 

    const handleDelete = async (id) => {
        await fetch("https://aqueous-chamber-71008.herokuapp.com/" + id, {
            method: "DELETE"
        })
        //deleting a dog from the database
        fetchDogs()
    }
    

    return (
        <div className="App">
            <nav class="navbar navbar-dark bg-dark">
                <h1>DOGS</h1>
                <Link to="/form">FORM</Link>
                <Link to="/">HOME</Link>
            </nav>
            <h1> Meet our Members </h1>

            {dogs.map((dog) => (
                <div className="border" key={dog._id}>
                    <h2> {dog.name} </h2>
                    <h4> {dog.breed}</h4>
                    <h4> {dog.age}</h4>

                    <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal" onClick={e => handleForm(dog)}>
                        Edit
</button>{" "}

                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={e => handleEdit(e, idState)}>
                                    {/* this idState is coming from the hooks */}
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

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {" "}
                    <button type="button" className="btn btn-danger" onClick={e => handleDelete(dog._id)}>Delete</button>
                </div>
            ))}

        </div>
    );
}


export default Dogs;