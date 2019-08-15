//Links to diffent routes
import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {

    logout = () => {
        sessionStorage.clear()
        this.props.setUser("")
    }

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill link-group">
                    <li className="nav-item navbar-link">
                    <Link className="nav-link nav-color" to="/triangulate">Triangulate</Link>
                    </li>
                    <li className="nav-item navbar-link">
                        <Link className="nav-link nav-color" to="/add">Add Locations & Friends</Link>
                    </li>
                </ul>
                <div className="logout-group">
                      <Link className="nav-link"  to="/welcome">
                        <button onClick={this.logout} className="nav-item logout">Logout</button>
                      </Link>
                </div>
            </nav>
        )
    }
}

export default NavBar
