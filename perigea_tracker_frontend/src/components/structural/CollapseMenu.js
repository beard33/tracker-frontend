import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { connect } from 'react-redux';
import { logout } from "../../redux/Actions";
import LogoutIcon from '@mui/icons-material/Logout';




function CollaspseMenu(props) {
    const [redirect, setRedirect] = useState(false)
    const [checkWidth, setCheckWidth] = useState(window.innerWidth);

    const checkFunc = () => {
        console.log(checkWidth);
        setCheckWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", checkFunc);

        return () => {
            window.removeEventListener("resize", checkFunc);
        };
    }, []);

    const logOut = () => {
        const { dispatch, history } = props
        dispatch(logout())
            .then(() => {
                console.log("logout")
            }).catch((error) => {
                console.log(error)
            });
    }


    return (
        <React.Fragment>
            <div className={`personal-menu${props.isMenuOpen === true ? ' open' : ''}`}   >
                <div className="pro-menu" >
                    <ProSidebar className="pro-sidebar-right">
                        <Menu>

                            <MenuItem>
                                <Link to={{ pathname: "/your-profile", state: "edit" }} title="modifica profilo">
                                    <img className="menu" src="./images/edit-profile.png" style={{ width: "100%", height: "100%", marginLeft: "0px", cursor: "pointer" }}></img>
                                </Link>
                            </MenuItem>
                            <MenuItem style={{ marginTop: "10%" }}>
                                <a href="/" onClick={logOut} title="logout">
                                    <LogoutIcon />
                                </a>
                            </MenuItem>

                        </Menu>
                    </ProSidebar>
                </div>
            </div>
            
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        nome: state.user.name,
        cognome: state.user.lastname,
        userEmail: state.user.email,
        type: state.user.type,
        scope: state.user.scope,
        username: state.user.username
    }
}

export default connect(mapStateToProps)(CollaspseMenu);



