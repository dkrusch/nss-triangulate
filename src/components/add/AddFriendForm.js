// All of us
import React, { Component } from "react"

class AddFriendForm extends Component {
  state = {
    text: "",
    user_id: +sessionStorage.getItem("activeUser")
  };

  clearFields = () => {
    document.getElementById("text").value = ""
  }

  addFriend = (event) =>
  {
    event.preventDefault()
    let dropdown = document.querySelector("#stranger-choice")
    let friend = this.props.users.find(user => {
        return user.username === dropdown.value})
    let friendObj = {
        user_id: +sessionStorage.getItem("activeUser"),
        friend_id: friend.id
    }
    this.props.addItem("friends", friendObj)
  }


  checkFields = (event) => {
    if (
      this.state.title === ""
    ) {
      window.alert("All fields must be filled out");
    } else {
      event.preventDefault()
      this.props.likeItem("users", this.state.text)
      this.clearFields()
    }
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  // Renders a search bar input and a button, with which a user may search for friends if they so desire
  render() {
    return (
      <React.Fragment>
        <form className="articleForm">
            <label for="stranger-choice">Search for a friend:</label>
            <input list="strangers" id="stranger-choice" name="friend-search" />
            <datalist id="strangers">
                {
                    this.props.strangers.map((stranger) =>
                    <option key={`stranger-${stranger.id}`} value={stranger.username} />
                )}
            </datalist>
            <button
                type="submit"
                onClick={this.addFriend}
                className="btn btn-primary"
            >
                Submit
            </button>
        </form>
      </React.Fragment>
    )
  }
}

export default AddFriendForm