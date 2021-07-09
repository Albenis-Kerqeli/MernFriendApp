/* eslint-disable eqeqeq */
import "./App.css";
import React, { useState , useEffect } from "react";
import Axios from "axios";
const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
if(name==""|| age=="") {
  alert('Please fill the fields to add any friend');
}
else {
  Axios.post("https://friends-app-mern.herokuapp.com/addfriend", {
    name: name,
    age: age,
  }).then((response) => {
    setListOfFriends([...listOfFriends, { _id:response.data._id,
      name:name ,age:age,
    }])
  })
}
  };
useEffect(() => {
    Axios.get("https://friends-app-mern.herokuapp.com/read")
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

const updateFriend = (id) => {
  const newAge =  prompt('Enter new age:');

  Axios.put('https://friends-app-mern.herokuapp.com/update', {newAge:newAge , id:id}).then(() => {
    setListOfFriends(listOfFriends.map(friend => {
       return friend._id == id ? {_id:id ,name:friend.name , age:newAge} : friend
    }))
  })
}

const deleteFriend = (id) => {
  Axios.delete(`https://friends-app-mern.herokuapp.com/delete/${id}`).then(() => {
     setListOfFriends(listOfFriends.filter(friend => friend._id !== id))
  })
}


  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Friend Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Friend Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={addFriend}>Add any  Friend</button>
      </div>
      <div className="listOfFriends">
        {listOfFriends.map((friend) => (
          <div className="friendContainer">
          <div className="friend">
            <h3><b>Name:</b> {friend.name}</h3>
            <h3><b>Age:</b> {friend.age}</h3>
          </div>
          <button onClick={() =>updateFriend(friend._id)}>Update</button>
          <button onClick={() => {
            deleteFriend(friend._id);
          }} id="removeBtn">X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
