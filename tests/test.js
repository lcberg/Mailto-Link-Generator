var assert = require('assert');
const mailtogen =  require('../mailtogen.js');

let gen = mailtogen.mailtogen();

describe('addRecipient', () => {
    gen.enableLogging();
    it('should add the recipient to the recipients', () => {
        gen.addRecipient('testing.test@test.com');
        let test = gen.recipients;
        assert(gen.recipients().includes('testing.test@test.com'), 'Email was not added');
    });

    it('should not add the email to the recipients', () => {
        gen.addRecipient('testing test@test.com');
        assert(!gen.recipients().includes('testing test@test.com '), 'Email was added wrongfully')
    });

    it('should remove whitespace from email and add it', () => {
        gen.addRecipient(' test@test.com ');
        assert(gen.recipients().includes('test@test.com'), 'Email wasnt trimmed and added');
        console.log(gen.recipients().toString());
    });

    console.log(gen.recipients().toString());
});