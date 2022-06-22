import React from 'react';
import AxiosInstance from "../../axios/AxiosInstance";
import Field from '../structural/Field';
import Title from '../structural/Title';
import SearchBar from '../structural/SearchBar';
import MonthFilter from '../structural/MonthFilter';
import LoadingSpinner from '../structural/LoadingSpinner';


const codiceResponsabile = "243a9d56-86a9-49a2-89c7-4e932685846f"
export default class TimesheetGrid extends React.Component {
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
        this.setState({ anno: new Date().getFullYear(), mese: new Date().getMonth() })
        this.getContattoResponsabile(codiceResponsabile)
    }



    /**
     * chiamata axios per le referenze del responsabile
     * @param {*} userId 
     */
    getContattoResponsabile = async (userId) => {       
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
        this.getTimesheetsSottoposti(this.state.anno, this.state.mese)
    }

    /**
    * metodo per il passaggio da un mese ad un altro 
    * @param {*} element 
    */
    setNewMonth = (month, year) => {        
        this.setState({ mese: month-1, anno: year, sync: !this.state.sync, isLoading: true })
        this.getContattoResponsabile(codiceResponsabile)
    }


    /**
     * chiamata axios per la lettura dei timesheet dei sottoposti
     */
    getTimesheetsSottoposti = (anno, mese) => {
        this.setState({ isLoading: true })       
        AxiosInstance({
            url: `timesheet/read-all-by-responsabile/${anno}/${mese + 1}/${codiceResponsabile}`
        }).then((response) => {           
            this.loadTimesheets(response.data.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }
    loadTimesheets = (response) => {
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
                {this.state.isLoading ? <LoadingSpinner /> :
                    <div className="card-grid">

                        <MonthFilter setNewMonth={this.setNewMonth} />

                        <SearchBar
                            searchValue={this.state.searchValue}
                            dynamicSearch={this.dynamicSearch}
                            placeholder={"stato di approvazione"}
                        />

                        {
                            Object.values(this.state.listCard).map((item) => {
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
        )
    }
}