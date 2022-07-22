import React from 'react';
import AxiosInstance from "../../axios/AxiosInstance";
import Field from '../structural/Field';
import Title from '../structural/Title';
import SearchBar from '../structural/SearchBar';
import MonthFilter from '../structural/MonthFilter';
import LoadingSpinner from '../structural/LoadingSpinner';
import { redirect } from '../../redux/Actions';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';



class TimesheetGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCard: "",
            showDeleteModal: false,
            showAddModal: false,
            keyCode: "",
            searchValue: "",
            showSpecificSearches: false,
            data: "",
            anno: 0,
            mese: 0,
            checkRef: false,
            contattoResponsabile: "",
            searchList: "",
            isLoading: false
        }
    }

    componentDidMount() {
        if (!this.props.navBar) {
            this.props.dispatch(redirect(this.props.location))
        }
        this.setState({ anno: new Date().getFullYear(), mese: new Date().getMonth() })
        this.getContattoResponsabile(this.props.user.codicePersona)
    }

    controlProps = () => {
        switch (this.props.location.state) {
            case "referente":
                this.getTimesheetsSottoposti(this.state.anno, this.state.mese)
                break;
            case "admin":
                this.readAllTimesheets(this.state.anno, this.state.mese)
                break;
        }
    }

    /**
     * chiamata axios per la lettura di tutti i timesheet del mese
     */
    readAllTimesheets = (anno, mese) => {
        this.setState({isLoading: true})
        console.log(this.state.anno, this.state.mese)
        AxiosInstance({
            method: 'get',
            url: `timesheet/read-all-by-mese-anno/${anno}/${mese + 1}`
        }).then((response) => {
            console.log(response)
            this.loadTimesheets(response.data.data)
        }).catch((error) => {
            console.log(error, "errore nella lettura dei timesheet")
            this.setState({isLoading: false})
        })
    }
    
    /**
     * chiamata axios per le referenze del responsabile
     * @param {*} userId 
     */
    getContattoResponsabile = async (userId) => {
        console.log(this.state.anno, this.state.mese)
        await AxiosInstance({
            method: "get",
            url: `utenti/contact-details/read-by-id/${userId}`,
        }).then((response) => {
            console.log(response)
            this.loadContattoResponsabile(response)
        }).catch((error) => {
            console.log("Error into load contattoResponsabile ", error)
        })
    }
    loadContattoResponsabile = (arg) => {
        this.setState({ contattoResponsabile: arg.data.data })
        this.controlProps()
    }

    /**
    * metodo per il passaggio da un mese ad un altro 
    * @param {*} element 
    */
    setNewMonth = (month, year) => {
        this.setState({ mese: month - 1, anno: year, sync: !this.state.sync, isLoading: true })
        this.getContattoResponsabile(this.props.user.codicePersona)
    }


    /**
     * chiamata axios per la lettura dei timesheet dei sottoposti
     */
    getTimesheetsSottoposti = (anno, mese) => {
        this.setState({ isLoading: true })
        AxiosInstance({
            url: `timesheet/read-all-by-responsabile/${anno}/${mese + 1}/${this.props.user.codicePersona}`
        }).then((response) => {
            this.loadTimesheets(response.data.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
            this.setState({ isLoading: false })
        })
    }
    loadTimesheets = (response) => {
        console.log(response)
        console.log("loadTimesheets")
        let result = []
        Object.values(response).map((element) => {
            result.push({
                nome: element.nome,
                cognome: element.cognome,
                oreTotali: element.oreTotali,
                anno: element.anno,
                mese: element.mese,
                codicePersona: element.codicePersona,
                approvalStatus: element.statoRichiesta
            })
        })
        console.log(result)
        this.setState({
            listCard: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1),
            searchList: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1),
            isLoading: false
        })
    }


    /**
     * filtro basato sul cognome del singolo utente
     * @param {*} e 
     */
    dynamicSearch = (e) => {
        if (this.state.listCard) {
            const keyword = e.target.value;
            if (keyword !== '') {
                const results = this.state.listCard.filter((timesheet) => {
                    return timesheet.approvalStatus.toLowerCase().includes(keyword.toLowerCase());
                });
                this.setState({ searchList: results })
            } else {
                this.setState({ searchList: this.state.listCard })
            }
            this.setState({ searchValue: keyword })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Title></Title>
                {this.props.user ?

                    <React.Fragment>
                        {this.state.isLoading ? <LoadingSpinner /> :
                            <div className="card-grid">

                                <MonthFilter setNewMonth={this.setNewMonth} />

                                <SearchBar
                                    searchValue={this.state.searchValue}
                                    dynamicSearch={this.dynamicSearch}
                                    placeholder={"stato di approvazione"}
                                />

                                {
                                    Object.values(this.state.searchList).map((item) => {
                                        return (
                                            <React.Fragment>
                                                <Field
                                                    timesheet={item}
                                                    tipo="T"
                                                    contattoResponsabile={this.state.contattoResponsabile}
                                                ></Field>
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </div>
                        }
                    </React.Fragment>
                    : <Redirect to={{ pathname: "/" }} />}
            </React.Fragment>
        )
    }
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

export default withRouter(connect(mapStateToProps)(TimesheetGrid));