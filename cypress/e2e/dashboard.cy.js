describe("dahsboard page test case",() => {
    it("Do Login With Correct Values", () => {
        cy.visit("http://localhost:3000");
        const email = cy.get("input[name='email']");
        email.type("user@react.test");

        const password = cy.get("input[name='password']");
        password.type("password");
        
        const button = cy.get("button");
        button.click();
        cy.on("window:alert",(text) => {
            expect(text).to.contains("welcome");
        });

        cy.url().should("eq","http://localhost:3000/dashboard");
    });

    it("Found No Post for the First Time", () => { 
        cy.contains("Found 0 photos");
    });

    it("Contains image url and description input, and Publish button", () => { 
        // check url
        const image = cy.get("input[name='image'");
        image.should("be.visible");
        image.should("have.attr","type","url");
        image.should("have.attr","required","required");
        image.should("have.attr","placeholder","Image URL");

        // check description
        const description = cy.get("input[name='desc'");
        description.should("be.visible");
        description.should("have.attr","type","text");
        description.should("have.attr","required","required");
        description.should("have.attr","placeholder","What's on your mind?");

        // check button
        const button = cy.get("button");
        button.should("be.visible");
        button.contains("Publish!");
        button.should("have.css","background-color","rgb(79, 70, 229)");
        button.should("have.css","color","rgb(255, 255, 255)");        
    });

    it("Upload Some Photos", () => { 
        const photos = [
            {
                imageValue:"https://images.unsplash.com/photo-1657299156537-2fd96dc2446e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                descriptionValue:"Image 1:Lorem Ipsum"
            },
            {
                imageValue:"https://images.unsplash.com/photo-1660239182405-77b04854c237?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                descriptionValue:"Image 2:Lorem Ipsum"
            }
        ];

        photos.forEach(({ imageValue, descriptionValue }) => {
            const image = cy.get("input[name='image']");
            image.type(imageValue);

            const description = cy.get("input[name='desc']");
            image.type(descriptionValue);

            const button = cy.get("button");
            image.click();

            //check upload image is exist
            cy.get("img").should("have.attr","src", imageValue);
            cy.contains(descriptionValue);
        });

        // cy.contains('Found'.${photos.length}.'photos');
    });
});