///<reference types="cypress"/>

describe('basicTests',()=>{

    before(() => {
        cy.visit('https://search.dicta.org.il/')
    })

    afterEach(() => {
        cy.go(-2)
      })
    

    it('Run search in hebrew mode',()=>{
        cy.setLanguageMode('Hebrew')
        cy.searchRun('שיר השירים')
        cy.resultsTests('שִׁ֥יר הַשִּׁירִ֖ים אֲשֶׁ֥ר לִשְׁלֹמֹֽה')
    })

    it('Run search in english mode',()=>{
        cy.setLanguageMode('Hebrew')
        cy.searchRun('שיר השירים')
        cy.resultsTests('שִׁ֥יר הַשִּׁירִ֖ים אֲשֶׁ֥ר לִשְׁלֹמֹֽה')
    })

})