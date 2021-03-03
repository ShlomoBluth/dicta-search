Cypress.Commands.add('showBooks',()=>{
    cy.get('#books').click()
    //Each collection
    cy.get('.inner-accordion-link').each($link=>{
        cy.get($link).click()
    })
})

Cypress.Commands.add('closeBooks',()=>{
    //Each collection
    cy.get('.inner-accordion-link').each($link=>{
        cy.get($link).click()
    })
    cy.get('#books').click()
})

Cypress.Commands.add('selectedBooksMap',()=>{
    let books=new Map()
    //Each book
    cy.get('[data-id="book_checkbox"]').each($book=>{
        cy.get($book).within(()=>{
            cy.getTextNumbers().then(textMumbers=>{
                if(textMumbers>0){
                    cy.get('[class*="checkbox-indicator"]').then($checkbox=>{
                        //if selected
                        if($checkbox.css('background-color')!=='rgba(0, 0, 0, 0)'){
                            cy.getBookName().then(name=>{
                                books.set(name,textMumbers)
                            })
                        }
                    })
                }
            })
        })

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

Cypress.Commands.add('getBookName',()=>{
    cy.get('[class*="check-text"]').then($book=>{
        return $book.text().substring($book.text().indexOf('ספר')+4)
    })
})