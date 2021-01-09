
Cypress.Commands.add('newIntercept',(url,delaySeconds,status,name)=>{
  cy.intercept('POST', url, {
      delayMs:1000*delaySeconds,
      statusCode: status
  }).as(name)
})

Cypress.Commands.add('searchRequest',({language,status=200,message='',delaySeconds=0})=>{
  cy.newIntercept('/lexemes',delaySeconds,status,'lexemes')
  cy.newIntercept('/related',delaySeconds,status,'related')
  cy.newIntercept('/wordforms',delaySeconds,status,'wordforms')
  cy.newIntercept('/search',delaySeconds,status,'search')
  cy.newIntercept('/books',delaySeconds,status,'books')
  cy.setLanguageMode(language)
  cy.get('input[id="search_box"]').type('בראשית ברא')
  if(message.length>0){
    cy.contains(message,{timeout:1000*delaySeconds}).should('not.exist')
  }  
  cy.get('button[id="mobile_search_button"]').click({force:true})

  if(message.length>0){
    cy.contains(message,{timeout:1000*delaySeconds}).should('exist')
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