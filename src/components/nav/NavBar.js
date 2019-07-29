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
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/triangulate">Triangulate</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add">Add Locations & Friends</Link>
                    </li>
                    <Link className="nav-link"  to="/welcome">
                        <button onClick={this.logout} className="nav-item">Logout</button>
                    </Link>
                </ul>
            </nav>
        )
    }
}

export default NavBar
