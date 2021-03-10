///<reference types="cypress"/>





describe('bible-search-tests',()=>{

    before(() => {
        cy.visit('https://use-dicta-components-2--cranky-banach-377068.netlify.app/')
    })

    afterEach(() => {
        cy.get('a[id="meanings_and_synonyms"]').then($meaningsAndSynonyms=>{
            if($meaningsAndSynonyms.attr('class').includes('active')){
                cy.closeMeaningsAndSynonyms() 
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

    

    it('Each result contains at least one word form of each search word',()=>{
        cy.hebrewSearchRun({text:'יום השישי',page:'Start'})
        cy.removeTaamim()
        cy.showAllWordForms()
        cy.eachSelectedWordFormMatrix().then(selectedWordFormMatrix=>{
            //For the first word in the search has 12 words form
            expect(selectedWordFormMatrix[0].length).eq(12)
            //For the second word in the search has 2 words form
            expect(selectedWordFormMatrix[1].length).eq(2)
            cy.resultPagination({
                tests:'wordForms',
                data:selectedWordFormMatrix
            })
        })
    })

    it('Removal of word form',()=>{
        cy.hebrewSearchRun({text:'יום השישי'})
        cy.showAllWordForms()
        //The number in the top has 12
        cy.get('.f > span > :nth-child(2)').should('contain',12)
        //Removal of בַּיֹּום
        cy.get('li').contains('בַּיֹּום').within(()=>{
            cy.get('[type="checkbox"]').uncheck({force: true})
        })
        cy.get('[class*="loader"]').should('not.exist')
        //The number in the top has 11
        cy.get('.f > span > :nth-child(2)').should('contain',11)
        cy.eachSelectedWordFormMatrix().then(selectedWordFormMatrix=>{
            //For the first word in the search has 11 words form    
            expect(selectedWordFormMatrix[0].length).eq(11)
            //For the second word in the search has 2 words form
            expect(selectedWordFormMatrix[1].length).eq(2)
            cy.resultPagination({
                tests:'wordForms',
                data:selectedWordFormMatrix
            })
        })
        //Check of בַּיֹּום
        cy.get('li').contains('בַּיֹּום').within(()=>{
            cy.get('[type="checkbox"]').check({force: true})
        })
    })
        
       
    
    it('Each word form appears in the results as the number of times it has been written next to word form',()=>{
        cy.hebrewSearchRun({text:'צבי'})
        cy.showAllWordForms()
        cy.wordFormsWithNumberOfAppearances()
    })

    it('A pair of words that come one after the other',()=>{
        cy.hebrewSearchRun({text:'שלום בית'})
        //Number of results
        cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
            expect(parseInt($numberOfResults.text())).to.eq(116)
        })
        cy.hebrewSearchRun({text:'"שלום בית"'})
        //Number of results
        cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
            expect(parseInt($numberOfResults.text())).to.eq(2)
        }).then(()=>{
            cy.showAllWordForms()
            cy.consecutiveWordsFormsArray().then(consecutiveWordFormsArray=>{
                cy.resultPagination({
                    tests:'wordFormsConsecutive',
                    data:consecutiveWordFormsArray
                })
            })
        })
    })

    it('Each result contains the specific word',()=>{
        cy.hebrewSearchRun({text:'לַאֲרָיֹות'})
         cy.resultPagination({
            tests: 'specific search',
            data:'לַאֲרָיֹות'
         })
     })

    

   

    it('Each book appears in the results as the number of times it has been written next to book',()=>{
        cy.hebrewSearchRun({text:'יום השישי'})
        cy.showBooks()
        cy.selectedBooksMap().then(selectedBooks=>{
            //Number of books is 7    
            expect(selectedBooks.size).eq(7)
            cy.resultPagination({
                tests:'books',
                data:selectedBooks
            })
        })
    })

    it('Removal of book',()=>{
        cy.hebrewSearchRun({text:'יום השישי'})
        cy.showBooks()
        //remove book שמות
        cy.get('[class="slide-li"]').contains('ספר שמות').within(()=>{
            cy.get('[type="checkbox"]').uncheck({force: true})
            cy.get('[type="checkbox"]').should('not.be.checked')
        })
        cy.selectedBooksMap().then(selectedBooks=>{
            //Number of books is 6
            expect(selectedBooks.size).eq(6)
            cy.resultPagination({
                tests:'books',
                data:selectedBooks
            })
        })
    })

    it('Each result has at least one meaning of each search word',()=>{
        cy.hebrewSearchRun({text:'יום השישי'})
        cy.showMeaningsAndSynonyms()
        cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
            cy.resultPagination({
                tests:'selectedMeaningsAndSynonyms',
                data:meaningsAndSynonymsMatrix
            })
        })
    })

    it('Each meaning appears in the results as the number of times it has been written next to meaning',()=>{
        cy.hebrewSearchRun({text:'הבל הבלים'})
        cy.showMeaningsAndSynonyms()
        cy.eachMeaningTests() 
    })

    it('Each meaning and synonym appears in the results as the number of times it has been written'+
    ' next to meaning',()=>{
        cy.hebrewSearchRun({text:'הבל הבלים'})
        cy.showMeaningsAndSynonyms()
        cy.synonymsTests()
    })

    it('Each result has at least one meaning or synonym of each search word',()=>{
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

    it('Removal of meaning',()=>{
        cy.hebrewSearchRun({text:'אריה'})
        cy.showMeaningsAndSynonyms()
        cy.intercept('**').as('requests')
        cy.get('li[class="slide-li"]').contains('אֲרִי').within(()=>{
            cy.get('[type="checkbox"]').uncheck({force: true})
            cy.get('[type="checkbox"]').should('not.be.checked')
        }).then(()=>{
            cy.get('[class*="loader"]').should('not.exist')
            cy.wait('@requests').then(()=>{
                cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
                    cy.resultPagination({
                        tests:'selectedMeaningsAndSynonyms',
                        data:meaningsAndSynonymsMatrix
                    })
                })
            })
        })       
    })

    


    it('No meanings but there are synonyms',()=>{
        cy.hebrewSearchRun({text:'ששון חדווה'})
        //Results not exist
        cy.get('[class="result-list"]').should('not.exist').then(()=>{
            cy.showMeaningsAndSynonyms()
            //Select synonym of the word
            cy.get('[class="inner-ul"]').first().within(()=>{
                cy.selectSynonym('גִּילָה')
            })
            //Select synonym of the word
            cy.get('[class="inner-ul"]').first().next().within(()=>{
                cy.selectSynonym('רִנָּה')
            })
        }).then(()=>{
            //The number in the top has 6
            cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
                expect(parseInt($numberOfResults.text())).to.eq(6)
            })
        })
        cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
            cy.resultPagination({tests:'selectedMeaningsAndSynonyms',data:meaningsAndSynonymsMatrix})
        })
    })

    

    it('Search with root words',()=>{
        cy.hebrewSearchRun({text:'ברא'})
        cy.existsInResult('וַיִּבְרָא')
    })

    it('search full spelling and also get partial spelling results',()=>{
        cy.hebrewSearchRun({text:'דָּוִיד'})
        cy.existsInResult('דָוִד')
    })

    it('search partial spelling and also get full spelling results',()=>{
        cy.hebrewSearchRun({text:'דָוִד'})
        cy.existsInResult('דָּוִיד')
    })

    // it('Second person',()=>{
    //     cy.hebrewSearchRun({text:'אֹתְכָה'})
    //     cy.existsInResult('אֹותְךָ')
    // })

    it('Different suffixes second person that does not end with "ה"',()=>{
        cy.hebrewSearchRun({text:'אֹותְךָ'})
        cy.existsInResult('אֹתְכָה')
    })

    // it('Second person, female',()=>{
    //     cy.hebrewSearchRun({text:'גַּרְתָּה'})
    //     cy.existsInResult('גַּרְתָּ')
    // })

    it('Different suffixes second person, female that does not end with "ה"',()=>{
        cy.hebrewSearchRun({text:'גַּרְתָּ'})
        cy.existsInResult('גַּרְתָּה')
    })

    // it('Third person',()=>{
    //     cy.hebrewSearchRun({text:'כֻּלֹּה'})
    //     cy.existsInResult('כֻּלֹּו')
    // })

    it('Different suffixes third person that does not end with "ה"',()=>{
        cy.hebrewSearchRun({text:'כֻּלֹּו'})
        cy.existsInResult('כֻּלֹּה')
    })

    it('Search additional א and also get missing א results',()=>{
        cy.hebrewSearchRun({text:'ונטמאתם'})
        cy.existsInResult('וְנִטְמֵתֶם')
    })

    it('Search missing א and also get additional א results',()=>{
        cy.hebrewSearchRun({text:'ורציתי'})
        cy.existsInResult('וְרָצִאתִי')
    })

    it('Search missing ה and also get additional ה results',()=>{
        cy.hebrewSearchRun({text:'כָּמֹוךָ'})
        cy.existsInResult('כָמֹכָה')
    })

    // it('Additional ה',()=>{
    //     cy.hebrewSearchRun({text:'כָמֹכָה'})
    //     cy.existsInResult('כָּמֹוךָ')
    // })

    it('Interchangeable letters',()=>{
        cy.hebrewSearchRun({text:'ימלא'})
        cy.existsInResult('יְמַלֵּה') 
    })

    // it('Interchangeable letters',()=>{
    //     cy.hebrewSearchRun({text:'יְמַלֵּה'})
    //     cy.existsInResult('יִמָּלֵא')
    // })

    it('Interchangeable letters',()=>{
        cy.hebrewSearchRun({text:'וארסתיך'})
        cy.existsInResult('וְאֵרַשְׂתִּיךְ') 
    })

    it('Different ways the bible refers to G-d',()=>{
        cy.hebrewSearchRun({text:'א-להים'})
        cy.existsInResult('הָאֱלֹהִים')
        cy.hebrewSearchRun({text:'ה\''})
        cy.existsInResult('הָאֱלֹהִים')
    })

    it('Search with numbers',()=>{
        cy.hebrewSearchRun({text:'127'})
        cy.existsInResult('מֵאָה')
        cy.existsInResult('וְעֶשְׂרִים')
        cy.existsInResult('וְשֶׁבַע')
    })




})