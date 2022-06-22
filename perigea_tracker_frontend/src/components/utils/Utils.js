import React, { Component } from 'react'

const monthsWithThirtyDays = [4, 6, 9, 11]


/**
    * metodo per il settaggio delle note spese (FIXME da inserire nelle utils)
    * @param {*} day 
    * @param {*} note 
    * @returns 
    */
const setNoteSpeseDay = (day, note) => {
    let noteSpese = []
    let notaSpese
    note.map((item) => {
        notaSpese = {
            anno: item.anno,
            mese: item.mese,
            giorno: day,
            codicePersona: item.codicePersona,
            codiceCommessa: item.codiceCommessa,
            costoNotaSpese: item.costoNotaSpese,
            importo: item.importo
        }
        noteSpese.push(notaSpese)
    })
    return noteSpese;
}
export { setNoteSpeseDay }


/**
 * metodo per ottenere la data finale di un mes
 * @param {*} mese 
 * @param {*} anno 
 * @returns 
 */
const getMonthEndDate = (mese, anno) => {
    let endDay;
    if (mese === 2) {
        anno % 4 === 0 ? endDay = 29 : endDay = 28;
    } else {
        if (monthsWithThirtyDays.find(el => el === mese)) {
            endDay = 30;
        } else {
            endDay = 31;
        }
    }
    return endDay
}
export { getMonthEndDate }


/**
 * metodo per ottenere le date corrispondenti al weekend
 * @param {*} mese 
 * @param {*} anno 
 * @returns 
 */
const getWeekendDays = (mese, anno) => {
    console.log(mese, anno)
    let weekendDays = []
    let endDay;
    endDay = getMonthEndDate(mese, anno)
    for (let i = 1; i <= endDay; i++) {
        let date = new Date(anno, mese, i)
        if (date.getDay() == 0 || date.getDay() == 6) {
            weekendDays.push(date)
        }
    }
    return weekendDays
}
export { getWeekendDays }