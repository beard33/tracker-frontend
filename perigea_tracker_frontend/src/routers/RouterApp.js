//componente che smista le varie pagine in base all'indirizzo

import React from 'react';
import { withRouter,Switch, Route } from "react-router-dom"
import Message from '../components/functional/Message';
import PersonalProfile from '../components/functional/PersonalProfile';
import View from '../components/structural/View';
import Cliente from '../components/functional/Cliente';
import Consulente from '../components/functional/Consulente';
import DipendenteCreazione from '../components/functional/DipendenteCreazione';
import Fornitore from '../components/functional/Fornitore';
import Layout from '../components/structural/Layout';
import LoginPage from '../components/structural/LoginPage';
import Dipendente from '../components/functional/Dipendente';

export default function RouterApp() {
  console.log("ROUTERAPP ENTRY");
  return (
    <Switch>
    <Route path="/" exact component={LoginPage} />
      <Layout style={{height:"100%"}}>
        <Route path="/home" exact component={PersonalProfile} />
        <Route path="/message" exact component={Message} />
        <Route path="/inbox" exact component={Message} />
        <Route path="/grid2" exact component={Message} />
        <Route path="/search" exact component={Message} />
        <Route path="/language" exact component={Message} />
        <Route path="/img-profile2" exact component={Message} />
        <Route path="/profile" exact component={Message} />
        <Route path="/your-profile" exact component={PersonalProfile} />
        <Route path="/balance" exact component={Message} />
        <Route path="/view/clienti" exact component={Cliente} />
        <Route path="/consulenti" exact component={View} />
        <Route path="/anagrafica-dipendenti" exact component={DipendenteCreazione} />
        <Route path="/anagrafica-consulenti" exact component={Consulente} />
        <Route path="/dipendenti" exact component={View} />
        <Route path="/fornitori" exact component={Fornitore} />
        <Route path="/dipendente" exact component={Dipendente} />
      </Layout>
    </Switch>
  )
}
