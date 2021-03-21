///<reference types="cypress"/>


const path = require('path')





describe('bible-search-tests',()=>{

    before(() => {
        cy.visit('/')
    })

    afterEach(() => {
        cy.navigateToStartPage('https://use-dicta-components-2--cranky-banach-377068.netlify.app/')
     })

    

    // it('Each result contains at least one word form of each search word',()=>{
    //     cy.searchRun({text:'יום השישי',collection:'תנ"ך',language:'Hebrew'})
    //     cy.removeTaamim()
    //     cy.showAllWordForms()
    //     cy.eachSelectedWordFormMatrix().then(selectedWordFormMatrix=>{
    //         //For the first word in the search has 12 words form
    //         expect(selectedWordFormMatrix[0].length).eq(12)
    //         //For the second word in the search has 2 words form
    //         expect(selectedWordFormMatrix[1].length).eq(2)
    //         cy.resultPagination({
    //             tests:'wordForms',
    //             data:selectedWordFormMatrix
    //         })
    //     })
    // })

    // it('Removal of word form',()=>{
    //     cy.searchRun({text:'יום השישי',collection:'תנ"ך',language:'Hebrew'})
    //     cy.showAllWordForms()
    //     //The number in the top has 12
    //     cy.get('.f > span > :nth-child(2)').should('contain',12)
    //     //Removal of בַּיֹּום
    //     cy.get('li').contains('בַּיֹּום').within(()=>{
    //         cy.get('[type="checkbox"]').uncheck({force: true})
    //     })
    //     cy.get('[class*="loader"]').should('not.exist')
    //     //The number in the top has 11
    //     cy.get('.f > span > :nth-child(2)').should('contain',11)
    //     cy.eachSelectedWordFormMatrix().then(selectedWordFormMatrix=>{
    //         //For the first word in the search has 11 words form    
    //         expect(selectedWordFormMatrix[0].length).eq(11)
    //         //For the second word in the search has 2 words form
    //         expect(selectedWordFormMatrix[1].length).eq(2)
    //         cy.resultPagination({
    //             tests:'wordForms',
    //             data:selectedWordFormMatrix
    //         })
    //     })
    //     //Check of בַּיֹּום
    //     cy.get('li').contains('בַּיֹּום').within(()=>{
    //         cy.get('[type="checkbox"]').check({force: true})
    //     })
    // })
        
       
    
    // it('Each word form appears in the results as the number of times it has been written next to word form',()=>{
    //     cy.searchRun({text:'צבי',collection:'תנ"ך',language:'Hebrew'})
    //     cy.showAllWordForms()
    //     cy.wordFormsWithNumberOfAppearances()
    // })

    it('A pair of words that come one after the other',()=>{
        cy.searchRun({text:'שלום בית',collection:'תנ"ך',language:'Hebrew'})
        cy.removeTaamim()
        //Number of results
        cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
            expect(parseInt($numberOfResults.text())).to.eq(116)
        })
        cy.get('input[class*="search-form-control"]').clear({force:true})
        .type('"שלום בית"',{force:true})
        cy.get('[class*="fa-search text"]').click({force:true})
        cy.get('[class*="loader"]').should('not.exist')
        //Number of results
        cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
            expect(parseInt($numberOfResults.text())).to.eq(2)
        }).then(()=>{
            cy.showAllWordForms()
            //Wait for word forms to update 
            cy.get('[class="control control--checkbox"]').should('have.length',7)
            cy.consecutiveWordsFormsArray().then(consecutiveWordFormsArray=>{
                cy.resultPagination({
                    tests:'wordFormsConsecutive',
                    data:consecutiveWordFormsArray
                })
            })
        })
    })

    // it('Each result contains the specific word',()=>{
    //     cy.searchRun({text:'לַאֲרָיֹות',collection:'תנ"ך',language:'Hebrew'})
    //      cy.resultPagination({
    //         tests: 'specific search',
    //         data:'לַאֲרָיֹות'
    //      })
    //  })

    

   

    // it('Each book appears in the results as the number of times it has been written next to book',()=>{
    //     cy.searchRun({text:'יום השישי',collection:'תנ"ך',language:'Hebrew'})
    //     cy.showBooks()
    //     cy.selectedBooksMap().then(selectedBooks=>{
    //         //Number of books is 7    
    //         expect(selectedBooks.size).eq(7)
    //         cy.resultPagination({
    //             tests:'books',
    //             data:selectedBooks
    //         })
    //     })
    // })

    // it('Removal of book',()=>{
    //     cy.searchRun({text:'יום השישי',collection:'תנ"ך',language:'Hebrew'})
    //     cy.showBooks()
    //     //remove book שמות
    //     cy.get('[class="slide-li"]').contains('ספר שמות').within(()=>{
    //         cy.get('[type="checkbox"]').uncheck({force: true})
    //         cy.get('[type="checkbox"]').should('not.be.checked')
    //     })
    //     cy.selectedBooksMap().then(selectedBooks=>{
    //         //Number of books is 6
    //         expect(selectedBooks.size).eq(6)
    //         cy.resultPagination({
    //             tests:'books',
    //             data:selectedBooks
    //         })
    //     })
    // })

    // it('Each result has at least one meaning of each search word',()=>{
    //     cy.searchRun({text:'יום השישי',collection:'תנ"ך',language:'Hebrew'})
    //     cy.showMeaningsAndSynonyms()
    //     cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //         cy.resultPagination({
    //             tests:'selectedMeaningsAndSynonyms',
    //             data:meaningsAndSynonymsMatrix
    //         })
    //     })
    // })

    // it('Each meaning appears in the results as the number of times it has been written next to meaning',()=>{
    //     cy.searchRun({text:'הבל הבלים',collection:'תנ"ך',language:'Hebrew'})
    //     cy.showMeaningsAndSynonyms()
    //     cy.eachMeaningTests() 
    // })

    // it('Each meaning and synonym appears in the results as the number of times it has been written'+
    // ' next to meaning',()=>{
    //     cy.searchRun({text:'הבל הבלים',collection:'תנ"ך',language:'Hebrew'})
    //     cy.showMeaningsAndSynonyms()
    //     cy.synonymsTests()
    // })

    // it('Each result has at least one meaning or synonym of each search word',()=>{
    //     let numberOfResults
    //     cy.searchRun({text:'צבי',collection:'תנ"ך',language:'Hebrew'})
    //     //num of results befor synonyms
    //     cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //         numberOfResults=parseInt($numberOfResults.text())
    //     }).then(()=>{
    //         cy.showMeaningsAndSynonyms()
    //         cy.selectSynonym('עֹפֶר')
    //         cy.selectSynonym('צָבָא')
    //     }).then(()=>{
    //         //num of results after synonyms
    //         cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //             expect(parseInt($numberOfResults.text())).to.greaterThan( numberOfResults)
    //         })
    //     }).then(()=>{
    //         cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //             cy.resultPagination({
    //                 tests:'selectedMeaningsAndSynonyms',
    //                 data:meaningsAndSynonymsMatrix
    //             })
    //         })
    //     })
    // })

    // ////////////////////////////////////////////////////////////////////////////////

    // it('Removal of meaning',()=>{
    //     cy.searchRun({text:'אריה',collection:'תנ"ך',language:'Hebrew'})
    //     cy.showMeaningsAndSynonyms()
    //     //cy.intercept('**').as('requests')
    //     cy.get('li[class="slide-li"]').contains('אֲרִי').within(()=>{
    //         cy.get('[type="checkbox"]').uncheck({force: true})
    //         cy.get('[type="checkbox"]').should('not.be.checked')
    //     }).then(()=>{
    //         cy.get('[class*="loader"]').should('not.exist')
    //         //Check meanings update
    //         cy.get('[class*="collapse-btn"]').first().click().then(()=>{
    //             cy.get('[class="description-text"]').should('have.length',15)
    //         })
    //         cy.get('[class*="collapse-btn"]').first().click()
    //         cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //             cy.resultPagination({
    //                 tests:'selectedMeaningsAndSynonyms',
    //                 data:meaningsAndSynonymsMatrix
    //             })
    //         })
    //     })       
    // })

   


    // it('No meanings but there are synonyms',()=>{
    //     cy.searchRun({text:'ששון חדווה',collection:'תנ"ך',language:'Hebrew'})
    //     //Results not exist
    //     cy.get('[class="result-list"]').should('not.exist').then(()=>{
    //         cy.showMeaningsAndSynonyms()
    //         //Select synonym of the word
    //         cy.get('[class="inner-ul"]').first().within(()=>{
    //             cy.selectSynonym('גִּילָה')
    //         })
    //         //Select synonym of the word
    //         cy.get('[class="inner-ul"]').first().next().within(()=>{
    //             cy.selectSynonym('רִנָּה')
    //         })
    //     }).then(()=>{
    //         //The number in the top has 6
    //         cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //             expect(parseInt($numberOfResults.text())).to.eq(6)
    //         })
    //     })
    //     cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //         cy.resultPagination({tests:'selectedMeaningsAndSynonyms',data:meaningsAndSynonymsMatrix})
    //     })
    // })

    // ////////////////////////////////////////////////////////////////////////

    // it('Search with root words',()=>{
    //     cy.searchRun({text:'ברא',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('וַיִּבְרָא','בָּרָא')
    // })

    // it('search full spelling and also get partial spelling results',()=>{
    //     cy.searchRun({text:'דָּוִיד',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('דָוִד','דָּוִיד')
    // })

    // it('search partial spelling and also get full spelling results',()=>{
    //     cy.searchRun({text:'דָוִד',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('דָּוִיד','דָוִד')
    // })

    // // // it('Second person',()=>{
    // // //     cy.searchRun({text:'אֹתְכָה',collection:'תנ"ך',language:'Hebrew'})
    // // //     cy.existsInResult('אֹותְךָ')
    // // // })

    // it('Different suffixes second person that does not end with "ה"',()=>{
    //     cy.searchRun({text:'אֹותְךָ',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('אֹתְכָה','אֹותְךָ')
    // })

    // // // it('Second person, female',()=>{
    // // //     cy.searchRun({text:'גַּרְתָּה',collection:'תנ"ך',language:'Hebrew'})
    // // //     cy.existsInResult('גַּרְתָּ')
    // // // })

    // it('Different suffixes second person, female that does not end with "ה"',()=>{
    //     cy.searchRun({text:'גַּרְתָּ',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('גַּרְתָּה','גַּרְתָּ')
    // })

    // // // it('Third person',()=>{
    // // //     cy.searchRun({text:'כֻּלֹּה',collection:'תנ"ך',language:'Hebrew'})
    // // //     cy.existsInResult('כֻּלֹּו')
    // // // })

    // it('Different suffixes third person that does not end with "ה"',()=>{
    //     cy.searchRun({text:'כֻּלֹּו',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('כֻּלֹּה','כֻּלֹּו')
    // })

    // it('Search additional א and also get missing א results',()=>{
    //     cy.searchRun({text:'ונטמאתם',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('וְנִטְמֵתֶם','ונטמאתם')
    // })

    // it('Search additional א and also get missing א results',()=>{
    //     cy.searchRun({text:'מראשית',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('מֵרֵשִׁית','מֵרֵאשִׁית')
    // })


    // it('Search missing א and also get additional א results',()=>{
    //     cy.searchRun({text:'ורציתי',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('וְרָצִאתִי','ורציתי')
    // })

    // // // it('Search missing א and also get additional א results',()=>{
    // // //     cy.searchRun({text:'מֵרֵשִׁית',collection:'תנ"ך',language:'Hebrew'})
    // // //     cy.existsInResult('מֵרֵאשִׁית')
    // // // })


    // it('Search missing ה and also get additional ה results',()=>{
    //     cy.searchRun({text:'כָּמֹוךָ',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('כָמֹכָה','כָּמֹוךָ')
    // })

    // // // it('Additional ה',()=>{
    // // //     cy.searchRun({text:'כָמֹכָה',collection:'תנ"ך',language:'Hebrew'})
    // // //     cy.existsInResult('כָּמֹוךָ')
    // // // })

    // it('Interchangeable letters',()=>{
    //     cy.searchRun({text:'ימלא',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('יְמַלֵּה','יִמָּלֵא') 
    // })

    // it('Interchangeable letters',()=>{
    //     cy.searchRun({text:'חטים',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('חִטִּין','חִטִּים') 
    // })

    // // // it('Interchangeable letters',()=>{
    // // //     cy.searchRun({text:'יְמַלֵּה',collection:'תנ"ך',language:'Hebrew'})
    // // //     cy.existsInResult('יִמָּלֵא')
    // // // })

    // it('Interchangeable letters',()=>{
    //     cy.searchRun({text:'וארסתיך',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('וְאֵרַשְׂתִּיךְ','וארסתיך') 
    // })

    // it('Different ways the bible refers to G-d',()=>{
    //     cy.searchRun({text:'א-להים',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('הָאֱלֹהִים','א-להים')
    //     // cy.searchRun({text:'ה\'',language:'Hebrew'})
    //     // cy.existsInResult('הָאֱלֹהִים')
    // })

    // it('Search with numbers',()=>{
    //     cy.searchRun({text:'127',collection:'תנ"ך',language:'Hebrew'})
    //     cy.existsInResult('מֵאָה','100')
    //     cy.existsInResult('וְעֶשְׂרִים', '20')
    //     cy.existsInResult('וְשֶׁבַע','7')
    // })

    // const downloadsFolder = Cypress.config('downloadsFolder')

    // it('Html download',()=>{
    //     cy.searchRun({text:'יום השישי',page:'Start',collection:'תנ"ך',language:'Hebrew'})
    //     cy.exec(' npx rimraf cypress/downloads/*')
    //     cy.removeTaamim()
    //     cy.get('[class*="dropdown-toggle"]').contains('הורדה').click()
    //     cy.get('p').contains('קובץ CSV').parent().within(()=>{
    //         cy.get('[type="radio"]').check({force:true})
    //     })
    //     cy.get('[type="submit"]').click().then(()=>{
    //         const filename = path.join(downloadsFolder, 'searchResults.csv')
    //         cy.readFile(filename,{timeout:150000}).should('have.length',19)
    //     })
    // })




})