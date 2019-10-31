var mailLinkGenerator = function() {
    // link related fields
    let _recipients = [];
    let _ccs = [];
    let _bccs = [];
    let _subject = '';
    let _content = '';

    // setting fields
    const __consolePrefix = '[MailtoGen]: ';
    let __emailValidateExpression = /\S+@\S+\.\S+/;
    let __log = false;
    let __validateEmails = true;

    function _isString(string) {
        return typeof string == 'string' || string instanceof String;
    }

    function _log(text) {
        if(__log) console.log(__consolePrefix + text);
    };

    function _validateEmail(email) {
        var exp = new RegExp(__emailValidateExpression);
        _log('Testing email: ' + email)
        return exp.test(email);
    };

    function _setSubject(text) {
        if(_isString(text)) {
            text = _escapeQuestionmark(text);
            text = _escapeAmpersand(text);
            _subject = text;
            _log('The subject was successfully updated.');
            return true;
        }
        else { 
            _log('The subject was not updated because the provided subject is not a string.');
            return false;
        }
    }

    function _setContent(text) {
        if(_isString(text)) {
            text = _escapeQuestionmark(text);
            text = _escapeAmpersand(text);
            _content = text;
            _log('The content was successfully updated.');
            return true;
        } else {
            _log('The content was not updated because the provided content is not a string.');
            return false;
        }
    }
    
    // Adds the given email to the recipients array, but only if its a string.
    // Checks if email validation is turned on (default: true) for valid emails.
    function _addRecipient(email) {
        if(_isString(email)) {
            if(__validateEmails) {
                if(_validateEmail(email)) { 
                    email = _escapeQuestionmark(email);
                    email = _escapeAmpersand(email);
                    _recipients.push(email);
                    _log('A new email was added to the recipients: ' + email);
                    return true;
                }
                else {
                    _log('The provided email was not added to the recipients because it failed the email validation.')
                    return false;
                }
            }
            else {
                email = _escapeQuestionmark(email);
                email = _escapeAmpersand(email);
                _recipients.push(email);
                _log('A new email was added to the recipients: ' + email);
                return true;
            }
        }
        else _log('The provided email was not added to the recipients because it is not a string.');
        return false;
    }

    // Ueses __addRecipient to add multiple emails if the emails object is an array.
    function _addRecipients(emails) {
        if(!Array.isArray(emails)) {
            _log('The provided emails were not added to the recipients because they were not an array.');
            return false;
        }

        let result = true;

        emails.forEach(function(email) {
            if(!_addRecipient(email)) result = false;
        })
        return result;
    }

    function _addCC(email) {
        if(_isString(email)) {
            if(__validateEmails) {
                if(_validateEmail(email)) { 
                    email = _escapeQuestionmark(email);
                    email = _escapeAmpersand(email);
                    _ccs.push(email);
                    _log('A new email was added to the ccs: ' + email);
                    return true;
                }
                else {
                    _log('The provided email was not added to the ccs because it failed the email validation.')
                    return false;
                }
            }
            else {
                email = _escapeQuestionmark(email);
                email = _escapeAmpersand(email);
                _ccs.push(email);
                _log('A new email was added to the ccs: ' + email);
                return true;
            }
        }
        else _log('The provided email was not added to the ccs because it is not a string.');
        return false;
    }

    function _addCCs(emails) {
        if(!Array.isArray(emails)) {
            _log('The provided emails were not added to the ccs because they were not an array.');
            return false;
        }

        let result = true;

        emails.forEach(function(email) {
            if(!_addCC(email)) result = false;
        })
        return result;
    }

    function _addBCC(email) {
        if(_isString(email)) {
            if(__validateEmails) {
                if(_validateEmail(email)) { 
                    email = _escapeQuestionmark(email);
                    email = _escapeAmpersand(email);
                    _bccs.push(email);
                    _log('A new email was added to the bccs: ' + email);
                    return true;
                }
                else {
                    _log('The provided email was not added to the bccs because it failed the email validation.')
                    return false;
                }
            }
            else {
                email = _escapeQuestionmark(email);
                email = _escapeAmpersand(email);
                _bccs.push(email);
                _log('A new email was added to the bccs: ' + email);
                return true;
            }
        }
        else _log('The provided email was not added to the bccs because it is not a string.');
        return false;
    }

    function _addBCCS(emails) {
        if(!Array.isArray(emails)) {
            _log('The provided emails were not added to the bccs because they were not an array.');
            return false;
        }

        let result = true;

        emails.forEach(function(email) {
            if(!_addBCC(email)) result = false;
        })
        return result;
    }

    // replaces all occurences of % with the url escaped code (%3F)
    function _escapeQuestionmark(text) {
        return text.replace('?', '%3F');
    }

    // replaces all occurences of & with the url escaped code (%26)
    function _escapeAmpersand(text) {
        return text.replace('&', '%26');
    }

    // generates a link with all the provided parameters
    function _value() {
        let link = 'mailto:';
        link += _recipients.join(',');

        // adds & to the end of the link if the last char is neither & or ?
        function addAmp() {
            if(link.slice(-1) !== '&' && link.slice(-1) !== '?') link += '&';
        };

        if(_ccs.length > 0 || _bccs.length > 0 || _subject != '' || _content != '') {
            
            link += '?';
            
            // add list of copies joined by a comma
            if(_ccs.length > 0) link += 'cc=' + _ccs.join(',');
            addAmp();

            // add list of blindcopies joined by a comma
            if(_bccs.length > 0) link += 'bcc=' + _bccs.join(',');
            addAmp();

            // adds the subject to the link
            if(_subject !== '') link += 'subject=' + _subject;
            addAmp(); 
            
            if(_content !== '') link += 'body=' + _content;
        }
        return link;
    }

    let publicInterface = {
        addRecipient: function(email) {
            return _addRecipient(email);
        },
        addRecipients: function(emails) {
            return _addRecipients(emails);
        },
        addCC: function(email) {
            return _addCC(email);
        },
        addCCs: function(emails) {
            return _addCCs(emails);
        },
        addBCC: function(email) {
            return _addBCC(email);
        },
        addBCCs: function(emails) {
            return _addBCCS(emails);
        },
        setSubject: function(text) {
            return _setSubject(text);
        },
        setContent: function(text) {
            return _setContent(text);
        },
        disableLogging: function() {
            __log = false;
        },
        enableLogging: function() {
            __log = true;
            return __log
        },
        enableEmailValidation: function() {
            __validateEmails = true;
            return __validateEmails;
        },
        disableEmailValidation: function() {
            __validateEmails = false;
            return __validateEmails;
        },
        value: function() {
            return _value();
        },
        isLogging: function() {
            return __log;
        },
        recipients: function() {
            return _recipients;
        },
        ccs: function() {
            return _ccs;
        },
        bccs: function() {
            return _bccs;
        },
        subject: function() {
            return _subject;
        },
        emailValidateExpression: function() {
            return __emailValidateExpression;
        },
        setEmailValidateExpression: function(expression) {
            __emailValidateExpression = expression;
            return __emailValidateExpression;
        }
    }

    return publicInterface;
}

export default mailLinkGenerator;