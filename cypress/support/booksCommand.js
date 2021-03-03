
Cypress.Commands.add('booksMap',()=>{
    let books=new Map()
    cy.get('#books').click()
    cy.get('.inner-accordion-link').each($link=>{
      cy.get($link).click()
      cy.get('.inner-accordion-content > .selectAll > .f').click()
      cy.get('.slide-list > li').each(li=>{
        cy.contains('()').should('not.exist').then(()=>{
          books.set(li.text().substring(li.text().indexOf('ספר')+4),
          parseInt(li.text().substring(li.text().indexOf('(')+1,li.text().indexOf(')'))))
        })
      })
      cy.get('.inner-accordion-content > .selectAll > .f').click()
      cy.get($link).click()
    }).then(()=>{
      return books
    })
  })

  Cypress.Commands.add('resultFromBooks',(booksMap,result)=>{
    cy.get(result).within(()=>{
      cy.get('.text-primary').then(book=>{
        for (let [key, value] of booksMap) {
          if(book.text().includes(key)){
            booksMap.set(key,value-1)
          }
        }
      })
    })
  })