describe("login page test",() => {
    it("Visit Login Page", () => {
        cy.visit("http://localhost:3000");
        cy.title().should("eq","React Gallery");
        cy.contains("Hello Again");
    });

    it("Contains Email dan Password Input, and Login button", () => {
        // check email 
        const email = cy.get("input[name='email'"); // untuk mengecek apa ada input dengan nama email
        email.should("be.visible"); // apakah email terlihat
        email.should("have.attr","type","email"); // mempunyai attribut type email
        email.should("have.attr","placeholder","Email Address"); // mempunya place holder "Email Addres"

        // check password
        const password = cy.get("input[name='password'");
        password.should("be.visible");
        password.should("have.attr","type","password");
        password.should("have.attr","placeholder","Password");

        // check button
        const button = cy.get("button");
        button.should("be.visible");
        button.contains("Login");
        button.should("have.css","background-color","rgb(79, 70, 229)");
        button.should("have.css","color","rgb(255, 255, 255)");
    });

    it("Do Login With Null Values", () => {
        // check alert
        const button = cy.get("button");
        button.click();
        cy.on("window:alert",(text) => {
            expect(text).to.contains("login failed");
        });
    });

    it("Do Login With Wrong Values", () => {
        const email = cy.get("input[name='email']");
        email.type("wrong@react.test");

        const password = cy.get("input[name='password']");
        password.type("password");
        
        const button = cy.get("button");
        button.click();
        cy.on("window:alert",(text) => {
            expect(text).to.contains("login failed");
        });
    });

    it("Do Login With Correct Values", () => {
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

});