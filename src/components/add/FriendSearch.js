//Daniel Krusch
import React, { Component } from "react";

export default class FriendSearch extends Component {

  // Renders a list of potential friends
  render() {
    return (
      <React.Fragment>
        <section className="friends">
        {
                // Checks the pontential friends array for the active user id
                // and won't display them if they search for theirself
                this.props.users.map(friend =>
                    {
                        console.log(!friend.id === +sessionStorage.getItem("activeUser"))
                        if (!(friend.id === +sessionStorage.getItem("activeUser")))
                        {
                            return <div key={friend.id} className="card card--friend">
                            <div className="card-body">
                                <div className="card-title">
                                    <h5>{friend.username}</h5>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        // When the add button is clicked, update the friend database with some new friends
                                        onClick=
                                        {() =>
                                            {
                                            let obj = {
                                                friend_id: friend.id,
                                                user_id: +sessionStorage.getItem("activeUser")
                                            }
                                            this.props.addFriend("friends", obj)
                                            }
                                        }>Add
                                    </button>
                                    </div>
                            </div>
                        </div>
                        }
                    }
                )
            }
        </section>
      </React.Fragment>
    );
  }
}
