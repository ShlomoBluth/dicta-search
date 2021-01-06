
Cypress.Commands.add('searchRequest',({language,status=200,message='',delaySeconds=0})=>{
    cy.intercept('POST', '/lexemes', {
      delayMs:1000*delaySeconds,
      body:'it worked!',
      statusCode: status
    }).as('lexemes')
    cy.intercept('POST', '/related', {
        delayMs:1000*delaySeconds,
        body:'it worked!',
        statusCode: status
    },).as('related')
    cy.intercept('POST', '/wordforms', {
        delayMs:1000*delaySeconds,
        body:'it worked!',
        statusCode: status
    },).as('wordforms')
    cy.intercept('POST', '/search', {
        delayMs:1000*delaySeconds,
        body:'it worked!',
        statusCode: status
    },).as('search')
    cy.intercept('POST', '/books', {
        delayMs:1000*delaySeconds,
        body:'it worked!',
        statusCode: status
    },).as('books')
    cy.setLanguageMode(language)
    cy.get('input[id="search_box"]').type('בראשית ברא')
    cy.get('button[id="mobile_search_button"]').click({force:true})
    //cy.get('[class*="loader"').should('exist')
    cy.wait('@lexemes',{responseTimeout:1000*delaySeconds})
    cy.wait('@related',{responseTimeout:1000*delaySeconds})
    cy.wait('@wordforms',{responseTimeout:1000*delaySeconds})
    cy.wait('@search',{responseTimeout:1000*delaySeconds})
    cy.wait('@books',{responseTimeout:1000*delaySeconds})

    cy.get('@search').its('response.statusCode').should('eq',status)

    if(message.length>0){
        cy.contains(message).should('exist')
    }
})

Cypress.Commands.add('setLanguageMode',(language)=>{
    cy.get('body').then(elem => {
      let languageMode
      if(language=='Hebrew'){
        languageMode='he'
      }else if(language=='English'){
        languageMode=''
      }
      let classAttr = elem.attr("class").substring(0,2);
      if(classAttr!=languageMode)
      {
        cy.get('a').contains(/^English$/||/^עברית$/).click();
      }
      if(languageMode=='he'){
        cy.get('a').contains(/^English$/).should('exist')
      } else{
        cy.get('a').contains(/^עברית$/).should('exist')
      }
    })
})