///<reference types="cypress"/>





describe('bible-search-tests',()=>{

    before(() => {
        cy.visit('https://use-dicta-components-2--cranky-banach-377068.netlify.app/')
    })

    afterEach(() => {
        cy.get('a[id="meanings_and_synonyms"]').then($meaningsAndSynonyms=>{
            if($meaningsAndSynonyms.attr('class').includes('active')){
                cy.clearInput() 
            }
        })
        cy.get('a[id="word_forms"]').then($wordForm=>{
            if($wordForm.attr('class').includes('active')){
                cy.closeAllWordForms()
            }
        })
        cy.get('a[id="books"]').then($books=>{
            if($books.attr('class').includes('active')){
                cy.closeBooks()
            }
        })
    })

    

    // it('Each result has word form of every word in the search',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי',page:'Start'})
    //     cy.removeTaamim()
    //     cy.showAllWordForms()
    //     cy.eachSelectedWordFormMatrix().then(selectedWordFormMatrix=>{
    //         expect(selectedWordFormMatrix[0].length).eq(12)
    //         expect(selectedWordFormMatrix[1].length).eq(2)
    //         cy.resultPagination({
    //             tests:'wordForms',
    //             data:selectedWordFormMatrix
    //         })
    //     })
    // })

    // it('Remove word form',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי'})
    //     cy.showAllWordForms()
    //     cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //         expect(parseInt($numberOfResults.text())).to.eq(12)
    //     })
    //     cy.contains('בַּיֹּום').click()
    //     cy.get('[class*="loader"]').should('not.exist')
    //     cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //         expect(parseInt($numberOfResults.text())).to.eq(11)
    //     })
    //     cy.eachSelectedWordFormMatrix().then(selectedWordFormMatrix=>{
    //         expect(selectedWordFormMatrix[0].length).eq(11)
    //         expect(selectedWordFormMatrix[1].length).eq(2)
    //         cy.resultPagination({
    //             tests:'wordForms',
    //             data:selectedWordFormMatrix
    //         })
    //     })
    //     cy.contains('יָמִים').click()
    // })
        
       
    
    // it('Each word form with number of Appearances',()=>{
    //     cy.hebrewSearchRun({text:'אריה'})
    //     cy.showAllWordForms()
    //     cy.wordFormsWithNumberOfAppearances()
    // })

    // it('A pair of words that come one after the other',()=>{
    //     cy.hebrewSearchRun({text:'שלום בית'})
    //     //Number of results
    //     cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //         expect(parseInt($numberOfResults.text())).to.eq(116)
    //     })
    //     cy.hebrewSearchRun({text:'"שלום בית"'})
    //     //Number of results
    //     cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //         expect(parseInt($numberOfResults.text())).to.eq(2)
    //     }).then(()=>{
    //         cy.showAllWordForms()
    //         cy.consecutiveWordsFormsArray().then(consecutiveWordFormsArray=>{
    //             cy.resultPagination({
    //                 tests:'wordFormsConsecutive',
    //                 data:consecutiveWordFormsArray
    //             })
    //         })
    //     })
    // })

    // it('Each result has specific search',()=>{
    //     cy.hebrewSearchRun({text:'לַאֲרָיֹות'})
    //      cy.resultPagination({
    //         tests: 'specific search',
    //         data:'לַאֲרָיֹות'
    //      })
    //  })

    

   

    // it('Each books with number of Appearances',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי'})
    //     cy.showBooks()
    //     cy.selectedBooksMap().then(selectedBooks=>{
    //         expect(selectedBooks.size).eq(7)
    //         cy.resultPagination({
    //             tests:'books',
    //             data:selectedBooks
    //         })
    //     })
    // })

    // it('Remove book',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי'})
    //     cy.showBooks()
    //     cy.contains('ספר שמות').click()
    //     cy.selectedBooksMap().then(selectedBooks=>{
    //         expect(selectedBooks.size).eq(6)
    //         cy.resultPagination({
    //             tests:'books',
    //             data:selectedBooks
    //         })
    //     })
    // })

    // it('Each result has meaning of every word in the search',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי'})
    //     cy.showMeaningsAndSynonyms()
    //     cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //         cy.resultPagination({
    //             tests:'selectedMeaningsAndSynonyms',
    //             data:meaningsAndSynonymsMatrix
    //         })
    //     })
    // })

    // it('Each meaning with number of Appearances',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי'})
    //     cy.showMeaningsAndSynonyms()
    //     cy.eachMeaningTests() 
    // })

    it('Each meaning with synonym and a number of Appearances',()=>{
        cy.hebrewSearchRun({text:'שיר השירים',page:'Start'})
        cy.removeTaamim()
        cy.showMeaningsAndSynonyms()
        cy.synonymsTests() 
    })

    it('Meaning with synonyms',()=>{
        let numberOfResults
        cy.hebrewSearchRun({text:'צבי'})
        //num of results befor synonyms
        cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
            numberOfResults=parseInt($numberOfResults.text())
        }).then(()=>{
            cy.showMeaningsAndSynonyms()
            cy.selectSynonym('עֹפֶר')
            cy.selectSynonym('צָבָא')
        }).then(()=>{
            //num of results after synonyms
            cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
                expect(parseInt($numberOfResults.text())).to.greaterThan( numberOfResults)
            })
        }).then(()=>{
            cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
                cy.resultPagination({
                    tests:'selectedMeaningsAndSynonyms',
                    data:meaningsAndSynonymsMatrix
                })
            })
        })
    })

    // it('remove Meaning',()=>{
    //     cy.hebrewSearchRun({text:'אריה'})
    //     cy.showMeaningsAndSynonyms()
    //     cy.get('p').contains('אֲרִי').click().then(()=>{
    //         cy.get('[class*="loader"]').should('not.exist')
    //         cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //             cy.resultPagination({
    //                 tests:'selectedMeaningsAndSynonyms',
    //                 data:meaningsAndSynonymsMatrix
    //             })
    //         })
    //     })       
    // })

    


    // it('No meanings but there are synonyms',()=>{
    //     cy.hebrewSearchRun({text:'ששון חדווה'})
    //     cy.get('[class="result-list"]').should('not.exist').then(()=>{
    //         cy.showMeaningsAndSynonyms()
    //         cy.get('[class="inner-ul"]').first().within(()=>{
    //             cy.selectSynonym('גִּילָה')
    //         })
    //         cy.get('[class="inner-ul"]').first().next().within(()=>{
    //             cy.selectSynonym('רִנָּה')
    //         })
    //     }).then(()=>{
    //         cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //             expect(parseInt($numberOfResults.text())).to.eq(6)
    //         })
    //     })
    //     cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //         cy.resultPagination({tests:'selectedMeaningsAndSynonyms',data:meaningsAndSynonymsMatrix})
    //     })
    // })

    

    // it('Search with root words',()=>{
    //     cy.hebrewSearchRun({text:'ברא'})
    //     cy.existsInResult('וַיִּבְרָא')
    // })

    // it('Full spelling',()=>{
    //     cy.hebrewSearchRun({text:'דָּוִיד'})
    //     cy.existsInResult('דָוִד')
    // })

    // it('Partial spelling',()=>{
    //     cy.hebrewSearchRun({text:'דָוִד'})
    //     cy.existsInResult('דָּוִיד')
    // })

    // it('Second person',()=>{
    //     cy.hebrewSearchRun({text:'אֹתְכָה'})
    //     cy.existsInResult('אֹותְךָ')
    // })

    // it('Second person',()=>{
    //     cy.hebrewSearchRun({text:'אֹותְךָ'})
    //     cy.existsInResult('אֹתְכָה')
    // })

    // it('Second person, female',()=>{
    //     cy.hebrewSearchRun({text:'גַּרְתָּה'})
    //     cy.existsInResult('גַּרְתָּ')
    // })

    // it('Second person, female',()=>{
    //     cy.hebrewSearchRun({text:'גַּרְתָּ'})
    //     cy.existsInResult('גַּרְתָּה')
    // })

    // it('Third person',()=>{
    //     cy.hebrewSearchRun({text:'כֻּלֹּה'})
    //     cy.existsInResult('כֻּלֹּו')
    // })

    // it('Third person',()=>{
    //     cy.hebrewSearchRun({text:'כֻּלֹּו'})
    //     cy.existsInResult('כֻּלֹּה')
    // })

    // it('Additional א',()=>{
    //     cy.hebrewSearchRun({text:'ונטמאתם'})
    //     cy.existsInResult('וְנִטְמֵתֶם')
    // })

    // it('Missing א',()=>{
    //     cy.hebrewSearchRun({text:'ורציתי'})
    //     cy.existsInResult('וְרָצִאתִי')
    // })

    // it('Missing ה',()=>{
    //     cy.hebrewSearchRun({text:'כָּמֹוךָ'})
    //     cy.existsInResult('כָמֹכָה')
    // })

    // it('Additional ה',()=>{
    //     cy.hebrewSearchRun({text:'כָמֹכָה'})
    //     cy.existsInResult('כָּמֹוךָ')
    // })

    // it('Interchangeable letters',()=>{
    //     cy.hebrewSearchRun({text:'ימלא'})
    //     cy.existsInResult('יְמַלֵּה') 
    // })

    // it('Interchangeable letters',()=>{
    //     cy.hebrewSearchRun({text:'יְמַלֵּה'})
    //     cy.existsInResult('יִמָּלֵא')
    // })

    // it('Interchangeable letters',()=>{
    //     cy.hebrewSearchRun({text:'וארסתיך'})
    //     cy.existsInResult('וְאֵרַשְׂתִּיךְ') 
    // })

    // it('Different ways the bible refers to G-d',()=>{
    //     cy.hebrewSearchRun({text:'א-להים'})
    //     cy.existsInResult('הָאֱלֹהִים')
    // })

    // it('Search with numbers',()=>{
    //     cy.hebrewSearchRun({text:'127'})
    //     cy.existsInResult('מֵאָה')
    //     cy.existsInResult('וְעֶשְׂרִים')
    //     cy.existsInResult('וְשֶׁבַע')
    // })




})