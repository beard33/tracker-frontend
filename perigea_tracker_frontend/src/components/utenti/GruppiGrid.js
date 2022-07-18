import React, { useState } from "react";
import AxiosInstance from "../../axios/AxiosInstance";
import { withRouter, Redirect } from "react-router-dom";
import { redirect, link } from "../../redux/Actions";
import { connect } from "react-redux";
import { useEffect } from "react";
import Title from "../structural/Title";
import DeleteModal from '../structural/DeleteModal';
import Field from "../structural/Field";
import SearchBar from "../structural/SearchBar";
import LoadingSpinner from "../structural/LoadingSpinner";
import GruppoCreazione from "./GruppoCreazione";
import { result } from "lodash";



function GruppiGrid(props) {
    const [state, setState] = useState({
        listCard: [],
        showDeleteModal: false,
        showAddModal: false,
        keyCode: "",
        searchValue: "",
        showSpecificSearches: false,
        isLoading: false,
        createGruppo: false,
        sync: false
    })
    const [searchList, setSearchList] = useState([])

    useEffect(() => {
        if (!props.navBar) {
            props.dispatch(redirect(props.location))
        }
        readAllGruppi()
    }, []);

    useEffect(() => {
        readAllGruppi()
    }, [state.sync])



    const readAllGruppi = async () => {
        setState({ ...state, isLoading: true })
        AxiosInstance({
            url: `gruppi/read-all`
        }).then((response) => {
            loadGruppi(response.data.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
            setState({ ...state, isLoading: false })
        })
    }
    const loadGruppi = (response) => {
        console.log(response)
        console.log("loadGruppi")
        let result = []
        Object.values(response).map((element) => {
            result.push({
                id: element.id,
                nome: element.nome,
                descrizione: element.descrizione
            })
        })
        console.log(result)
        setSearchList(result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1))
        setState({
            ...state,
            listCard: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1),
            isLoading: false
        })
    }

    const deleteGruppo = async (id) => {

        await AxiosInstance({
            method: 'delete',
            url: `gruppi/delete/${id}`
        }).then((response) => {
            alert("utente eliminato con successo");
            setState({
                ...state,
                listCard: state.listCard.filter(el => el.id !== id),
            })
            setSearchList(searchList.filter(el => el.id !== id))
        }).catch((error) => {
            console.log("Error into removeDipendente ", error)
        })

        handleClose()
    };



    /**
     * filtro basato sul nome del singolo gruppo
     * @param {*} e 
     */
    const dynamicSearch = (e) => {
        if (state.listCard) {
            let results = []
            const keyword = e.target.value;
            if (keyword !== '') {
                results = state.listCard.filter((gruppo) => {
                    return gruppo["nome"].toLowerCase().includes(keyword.toLowerCase());
                });
                setSearchList(results)
            } else {
                setSearchList(state.listCard)
            }
            setState({ ...state, searchValue: keyword })

        }
    }

    const handleClose = () => {
        setState({ ...state, showAddModal: false, showDeleteModal: false, sync: !state.sync })
    }


    const openDeleteModal = (id) => {
        setState({ ...state, showDeleteModal: true, keyCode: id })
    }



    return (
        <React.Fragment>
            <Title></Title>
            {props.user ?

                <React.Fragment>
                    {state.isLoading ? <LoadingSpinner /> :
                        <div className="card-grid">
                            <SearchBar
                                searchValue={state.searchValue}
                                dynamicSearch={dynamicSearch}
                                placeholder={"nome gruppo"}
                            />

                            <button
                                className="add-field-show-button"
                                onClick={() => { setState({ ...state, showAddModal: true }) }}
                                title="crea un gruppo"
                            >
                                <img className="menu" src="./images/add.png"></img>
                            </button>

                            {
                                Object.values(searchList).map((item) => {
                                    return (
                                        <React.Fragment>
                                            <Field
                                                gruppo={item}
                                                tipo="G"
                                                showDeleteModal={openDeleteModal}
                                            ></Field>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </div>}
                </React.Fragment>
                : <Redirect to="/" />
            }

            <GruppoCreazione handleClose={handleClose} open={state.showAddModal} />

            <DeleteModal
                open={state.showDeleteModal}
                toggle={openDeleteModal}
                close={handleClose}
                delete={deleteGruppo}
                keyCode={state.keyCode}
                typography={"desideri eliminare il seguente gruppo?"}
            />

        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.user,
        counter: state.counter,
        history: state.history,
        navBar: state.navBar
    }
}

export default withRouter(connect(mapStateToProps)(GruppiGrid));
