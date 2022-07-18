//componente che smista le varie pagine in base all'indirizzo

import React from 'react';
import { withRouter, Switch, Route } from "react-router-dom"
import Message from '../components/general/Message';
import PersonalProfile from '../components/general/PersonalProfile';
import View from '../components/structural/View';
import Cliente from '../components/AziendeEsterne/Cliente';
import Consulente from '../components/utenti/Consulente';
import DipendenteCreazione from '../components/utenti/DipendenteCreazione';
import Fornitore from '../components/AziendeEsterne/Fornitore';
import Layout from '../components/structural/Layout';
import LoginPage from '../components/structural/LoginPage';
import Dipendente from '../components/utenti/Dipendente';
import ConsulenteCreazione from '../components/utenti/ConsulenteCreazione';
import DipendenteView from '../components/utenti/DipendenteView';
import ConsulenteView from '../components/utenti/ConsulenteView';
import AziendaView from '../components/AziendeEsterne/AziendaView';
import CommessaFatturabile from '../components/commesse/CommessaFatturabile';
import OrdineCommessa from '../components/commesse/OrdineCommessa';
import CommessaNonFatturabile from '../components/commesse/CommessaNonFatturabile';
import CommesseGrid from '../components/commesse/CommesseGrid';
import CommessaNonFatturabileView from '../components/commesse/CommessaNonFatturabileView';
import CommessaFatturabileView from '../components/commesse/CommessaFatturabileView';
import TimesheetCreazione from '../components/timesheet/TimesheetCreazione';
import TimesheetView from '../components/timesheet/TimesheetView';
import GruppiGrid from '../components/utenti/GruppiGrid';
import UnauthorizedPage from '../components/general/UnauthorizedPage';
import TimesheetGrid from '../components/timesheet/TimesheetGrid';



export default function RouterApp() {
  console.log("ROUTERAPP ENTRY");
  return (
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Layout style={{ height: "100%" }}>
        <Route path="/home" component={PersonalProfile} exact={true} />
        <Route path="/message" exact component={Message} />
        <Route path="/inbox" exact component={Message} />
        <Route path="/grid2" exact component={Message} />
        <Route path="/search" exact component={Message} />
        <Route path="/language" exact component={Message} />
        <Route path="/img-profile2" exact component={Message} />
        <Route path="/profile" exact component={Message} />
        <Route path="/your-profile" exact component={PersonalProfile} />
        <Route path="/balance" exact component={Message} />
        <Route path="/add-clienti" exact component={Cliente} />
        <Route path="/gruppi-grid" exact component={GruppiGrid} />
        <Route path="/clienti" exact render={() => <View tipo="clienti" />} />
        <Route path="/consulenti" exact render={() => <View tipo="consulenti" />} />
        <Route path="/consulente" exact component={Consulente} />
        <Route path="/anagrafica-dipendenti" exact component={DipendenteCreazione} />
        <Route path="/anagrafica-consulenti" exact component={ConsulenteCreazione} />
        <Route path="/dipendenti" exact render={() => <View tipo="dipendenti" />} />
        <Route path="/add-fornitori" exact component={Fornitore} />
        <Route path="/fornitori" exact render={() => <View tipo="fornitori" />} />
        <Route path="/dipendente" exact component={Dipendente} />
        <Route path="/dipendenti-view" exact component={DipendenteView} />
        <Route path="/consulenti-view" exact component={ConsulenteView} />
        <Route path="/azienda-view" exact component={AziendaView} />
        <Route path="/unauthorized" exact component={UnauthorizedPage} />
        <Route path="/commessa-fatturabile" exact component={CommessaFatturabile} />
        <Route path="/ordine-commessa" exact component={OrdineCommessa} />
        <Route path="/commessa-non-fatturabile" exact render={() => <CommessaNonFatturabile />} />
        <Route path="/commesse" exact render={() => <CommesseGrid />} />
        <Route path="/commessa-non-fatturabile-view" exact component={CommessaNonFatturabileView} />
        <Route path="/commessa-fatturabile-view" exact component={CommessaFatturabileView} />
        <Route path="/timesheet-create" exact component={TimesheetCreazione} />
        <Route path="/timesheet-view" exact component={TimesheetView} />
        <Route path="/timesheet-grid" exact component={TimesheetGrid} />



      </Layout>
    </Switch>
  )
}
