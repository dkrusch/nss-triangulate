// All of us
import React, { Component } from "react"

class AddFriendForm extends Component {
  state = {
    text: "",
    user_id: +sessionStorage.getItem("activeUser")
  };

  clearFields = () => {
    document.querySelector("#stranger-choice").value = ""
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
    this.clearFields()
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
        <form className="articleForm form-group">
            <input list="strangers" id="stranger-choice" className="datalist-friend" name="friend-search" placeholder="Search for a friend"/>
            <div className="clear-group">
              <datalist id="strangers">
                  {
                      this.props.strangers.map((stranger) =>
                      <option key={`stranger-${stranger.id}`} value={stranger.username} />
                  )}
              </datalist>
            </div>
            <div className="submit-group">
              <button
                  type="submit"
                  onClick={this.addFriend}
                  className="add-button"
              >
                  Submit
              </button>
            </div>
        </form>
      </React.Fragment>
    )
  }
}

export default AddFriendForm