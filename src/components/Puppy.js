import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

//set up - same as the form to fill out
function Dogs() {
    const [dogs, setDogs] = useState([]);
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [idState, setId] = useState("");

    const fetchDogs = () => fetch("http://localhost:4000")
        .then(response => response.json())
        .then(dogs => setDogs(dogs))

    useEffect(() => {
        fetchDogs()
    }, [])

    const handleForm = (dog) => {
        console.log('handleForm')
        setName(dog.name)
        setBreed(dog.breed)
        setAge(dog.age)
        setId(dog._id)
    }

    const handleEdit = async (e, idState) => {
        e.preventDefault()
        console.log('handleEdit')
        const update = JSON.stringify({ name, breed, age })
        console.log('Update:', update)
        console.log('ID:', idState)
        await fetch("http://localhost:4000/" + idState, {
            method: "PUT",
            body: update,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        fetchDogs()
        document.querySelector('.close').click();
    }
    const handleDelete = async (id) => {
        await fetch("http://localhost:4000/" + id, {
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