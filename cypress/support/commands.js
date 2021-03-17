Cypress.Commands.add('removeTaamim',()=>{
  cy.get('[class*="text-select f-narkis"]').click()
})


Cypress.Commands.add('searchRequest',({url,language,status=200,message='',delaySeconds=0})=>{
  cy.intercept('POST', '**'+url+'**', {
    delayMs:1000*delaySeconds,
    statusCode: status
  })
  cy.setLanguageMode(language)
  if(message.length>0){
    cy.contains(message,{timeout:1000*delaySeconds}).should('not.exist')
  }  
  cy.searchRun('בראשית ברא')

  if(delaySeconds>0){
    cy.get('body').then(($body) => {
      cy.get('[class*="loader"]',{timeout:1000*delaySeconds}).should('not.exist')
      cy.contains(/Loading|טוען נתונים/g,{timeout:1000*delaySeconds}).should('not.exist')
    })
  }

  if(message.length>0){
    cy.contains(message).should('exist')
  }  

   
})



//***************** */


Cypress.Commands.add('existsInResult',(text)=>{
  //Recursive function through pages
  function existsInResults(text){
    return cy.existsInPageResult(text).then($exists=>{
      if($exists==true){
        return true
      }else{
        cy.get('[class*="pagination__navigation"]').last().then($lastPage=>{
          //If last page
          if($lastPage.attr('class').includes('disabled')){
            expect($exists).to.be.true
          }else{
            //Next page
            cy.get('[class*="pagination__navigation"]').last().click()
            return existsInResults(text)
          }
        })
      }
    })
  }
  existsInResults(text)
})

Cypress.Commands.add('existsInPageResult',(text)=>{
  let exists=false
  cy.get('.result-list').within(()=>{
    //Each bold word in results list
    cy.get('b').each($b=>{
      //If found text
      if($b.text()==text){
        exists=true
      }
    })
  }).then(()=>{
    return exists
  })
})

Cypress.Commands.add('resultContainsSpecificWord',(word,result)=>{
  let wordInResults
  let hasSpecificWord=false
  cy.get(result).within(()=>{
    //Each bold word in result
    cy.get('b').each($b=>{
      if($b.text().charAt(0)=='['||$b.text().charAt(0)=='('){
        wordInResults=$b.text().substring(1,$b.text().length-1)
      }else if($b.text().charAt($b.text().length)=='־'||
      $b.text().charAt($b.text().length)=='-'){
        wordInResults=$b.text().substring(0,$b.text().length-1)
      }else if($b.text().charAt(0)=='־'||$b.text().charAt(0)=='-'){
        wordInResults=$b.text().substring(1)
      }else{
        wordInResults=$b.text().trim()
      }
      //If found a bold word in result of the specific Word
      if(word==wordInResults){
        hasSpecificWord=true
      }
    }).then(()=>{
      //cy.log(wordInResults)
      expect(hasSpecificWord).to.be.true
    })
  })
})

Cypress.Commands.add('navigateToStartPage',()=>{
  function firstPage(){
    return cy.url().then(url=>{
      if(url!=='https://use-dicta-components-2--cranky-banach-377068.netlify.app/'){
        cy.go(-1)
        return firstPage()
      }else{
        cy.url().should('eq','https://use-dicta-components-2--cranky-banach-377068.netlify.app/')
      }
    })
  }
  firstPage()
})















